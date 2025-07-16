'use client'

import { useState, useEffect, memo } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import {
    DocumentCheckIcon,
    UserIcon,
    BuildingStorefrontIcon,
    CheckCircleIcon,
    XCircleIcon,
    EyeIcon,
    ClockIcon,
    CalendarIcon
} from '@heroicons/react/24/outline'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Image from 'next/image'

const ApplicationCard = memo(({ application, onApprove, onReject, isProcessing }) => {
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [rejectionReason, setRejectionReason] = useState('')
    const [rejectionError, setRejectionError] = useState('')

    const handleReject = async () => {
        if (!rejectionReason.trim() || rejectionReason.trim().length < 10) {
            setRejectionError('Rejection reason must be at least 10 characters')
            return
        }

        await onReject(application._id, rejectionReason.trim())
        setShowRejectModal(false)
        setRejectionReason('')
        setRejectionError('')
    }

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {application.userId?.profile?.avatar ? (
                            <Image
                                src={application.userId.profile.avatar}
                                alt={application.userId.profile.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-gray-500" />
                            </div>
                        )}
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {application.userId?.profile?.name || 'Unknown User'}
                            </h3>
                            <p className="text-sm text-gray-500">{application.userId?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4" />
                        {new Date(application.createdAt).toLocaleDateString()}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Business Information</h4>
                        <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Name:</span> {application.businessName}</p>
                            <p><span className="font-medium">Category:</span> {application.businessCategory}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Application Status</h4>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                                Pending Review
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Business Description</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {application.businessDescription}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <EyeIcon className="h-4 w-4" />
                        Applied {new Date(application.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowRejectModal(true)}
                            disabled={isProcessing}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors duration-200"
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => onApprove(application._id)}
                            disabled={isProcessing}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200 flex items-center gap-2"
                        >
                            <CheckCircleIcon className="h-4 w-4" />
                            Approve
                        </button>
                    </div>
                </div>
            </div>

            {/* Rejection Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <XCircleIcon className="h-6 w-6 text-red-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Reject Application</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Please provide a reason for rejecting this retailer application.
                        </p>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => {
                                setRejectionReason(e.target.value)
                                setRejectionError('')
                            }}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                            placeholder="Enter rejection reason (minimum 10 characters)..."
                        />
                        {rejectionError && (
                            <p className="text-sm text-red-600 mt-2">{rejectionError}</p>
                        )}
                        <div className="flex items-center gap-3 mt-4">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={isProcessing}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors duration-200"
                            >
                                {isProcessing ? 'Rejecting...' : 'Reject Application'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
})
ApplicationCard.displayName = 'ApplicationCard'

export default function AdminRetailerApplicationsPage() {
    const { user, loading } = useUser()
    const router = useRouter()
    const [applications, setApplications] = useState([])
    const [loadingApplications, setLoadingApplications] = useState(true)
    const [processingId, setProcessingId] = useState(null)
    const [error, setError] = useState('')

    // Redirect if not admin
    useEffect(() => {
        if (!loading && (!user || user.role !== 'Admin')) {
            router.push('/account')
        }
    }, [user, loading, router])

    // Fetch applications
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('/api/admin/retailer-applications?status=pending')
                if (response.ok) {
                    const data = await response.json()
                    setApplications(data.applications)
                } else {
                    setError('Failed to fetch applications')
                }
            } catch (error) {
                setError('Error loading applications')
            } finally {
                setLoadingApplications(false)
            }
        }

        if (user && user.role === 'Admin') {
            fetchApplications()
        }
    }, [user])

    const handleApprove = async (applicationId) => {
        setProcessingId(applicationId)
        try {
            const response = await fetch(`/api/admin/retailer-applications/${applicationId}/approve`, {
                method: 'PUT'
            })

            if (response.ok) {
                setApplications(prev => prev.filter(app => app._id !== applicationId))
            } else {
                setError('Failed to approve application')
            }
        } catch (error) {
            setError('Error approving application')
        } finally {
            setProcessingId(null)
        }
    }

    const handleReject = async (applicationId, rejectionReason) => {
        setProcessingId(applicationId)
        try {
            const response = await fetch(`/api/admin/retailer-applications/${applicationId}/reject`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rejectionReason })
            })

            if (response.ok) {
                setApplications(prev => prev.filter(app => app._id !== applicationId))
            } else {
                setError('Failed to reject application')
            }
        } catch (error) {
            setError('Error rejecting application')
        } finally {
            setProcessingId(null)
        }
    }

    if (loading || loadingApplications) {
        return (
            <div className="h-full flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        )
    }

    return (
        <div className="h-full w-full">
            {/* Header */}
            <div className="p-6 rounded-xl border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                    <DocumentCheckIcon className="h-8 w-8 text-gray-600" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Retailer Applications</h1>
                        <p className="text-gray-600 mt-1">Review and approve pending retailer applications</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {applications.length === 0 ? (
                    <div className="text-center py-12">
                        <BuildingStorefrontIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Applications</h3>
                        <p className="text-gray-600">All retailer applications have been processed.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {applications.map(application => (
                            <ApplicationCard
                                key={application._id}
                                application={application}
                                onApprove={handleApprove}
                                onReject={handleReject}
                                isProcessing={processingId === application._id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
