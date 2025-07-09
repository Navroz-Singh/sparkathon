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
                status: 'approved',
                reviewedBy: adminUser._id,
                reviewedAt: new Date()
            },
            { new: true }
        )

        // Update user role and retailer verification
        await User.findByIdAndUpdate(application.userId, {
            role: 'Retailer',
            'retailerVerification.status': 'approved',
            'retailerVerification.verifiedAt': new Date(),
            'retailerVerification.verifiedBy': adminUser._id.toString()
        })

        return NextResponse.json({
            success: true,
            message: 'Retailer application approved successfully',
            application: updatedApplication
        }, { status: 200 })

    } catch (error) {
        console.error('Admin approve application error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
