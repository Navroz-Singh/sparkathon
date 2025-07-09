import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import RetailerApplication from '@/models/RetailerApplication'

export async function PUT(request, { params }) {
    try {
        // Verify user authentication
        const supabase = await createClient()
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Connect to database
        await connectDB()

        // Get admin user from MongoDB and verify role
        const adminUser = await User.findOne({ supabaseId: user.id })
        if (!adminUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        if (adminUser.role !== 'Admin') {
            return NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 })
        }

        const { id } = params
        const { rejectionReason } = await request.json()

        // Validate rejection reason
        if (!rejectionReason || rejectionReason.trim().length < 10) {
            return NextResponse.json({
                error: 'Rejection reason is required (minimum 10 characters)'
            }, { status: 400 })
        }

        // Find the application
        const application = await RetailerApplication.findById(id)
        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 })
        }

        if (application.status !== 'pending') {
            return NextResponse.json({ error: 'Application has already been processed' }, { status: 400 })
        }

        // Update application status
        const updatedApplication = await RetailerApplication.findByIdAndUpdate(
            id,
            {
                status: 'rejected',
                reviewedBy: adminUser._id,
                reviewedAt: new Date(),
                rejectionReason: rejectionReason.trim()
            },
            { new: true }
        )

        // Update user retailer verification status
        await User.findByIdAndUpdate(application.userId, {
            'retailerVerification.status': 'rejected',
            'retailerVerification.verifiedAt': new Date(),
            'retailerVerification.verifiedBy': adminUser._id.toString()
        })

        return NextResponse.json({
            success: true,
            message: 'Retailer application rejected',
            application: updatedApplication
        }, { status: 200 })

    } catch (error) {
        console.error('Admin reject application error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
