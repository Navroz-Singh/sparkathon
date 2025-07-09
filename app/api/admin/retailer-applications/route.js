import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import RetailerApplication from '@/models/RetailerApplication'

export async function GET(request) {
    try {
        // Verify user authentication
        const supabase = await createClient()
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Connect to database
        await connectDB()

        // Get user from MongoDB and verify admin role
        const mongoUser = await User.findOne({ supabaseId: user.id })
        if (!mongoUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        if (mongoUser.role !== 'Admin') {
            return NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 })
        }

        // Get query parameters
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status') || 'pending'

        // Fetch applications with user details
        const applications = await RetailerApplication.find({ status })
            .populate('userId', 'email profile.name profile.avatar')
            .sort({ createdAt: -1 })

        return NextResponse.json({
            applications,
            total: applications.length
        }, { status: 200 })

    } catch (error) {
        console.error('Admin retailer applications fetch error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
