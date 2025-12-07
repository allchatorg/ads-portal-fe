'use client'

import React, {useState} from 'react'
import {Separator} from '@/components/ui/separator'
import {useUser} from '@/hooks/use-user'
import {UserRole} from '@/models/user-role'
import {EmailVerification} from './components/email-verification'
import {ChangePassword} from './components/change-password'
import {PhoneSettings} from './components/phone-settings'
import {EmailSettings} from './components/email-settings'
import {toast} from 'sonner'
import {SiteHeader} from '@/components/site-header'
import {
    useGetCurrentUserQuery,
    useSendVerificationEmailMutation,
    useVerifyEmailMutation
} from '@/store/services/userApi'

export default function AccountSettingsPage() {
    const {user} = useUser()
    const [loading, setLoading] = useState(false)
    const [verificationError, setVerificationError] = useState<string | undefined>()

    // Fetch current user data from API
    const {data: currentUser, isLoading: isLoadingUser} = useGetCurrentUserQuery()

    // Email verification mutations
    const [sendVerificationEmail, {isLoading: isSendingVerification}] = useSendVerificationEmailMutation()
    const [verifyEmail] = useVerifyEmailMutation()

    // Email verification handlers
    const handleVerifyEmail = async (token: string) => {
        try {
            setVerificationError(undefined)
            await verifyEmail({token}).unwrap()
            toast.success('Email verified successfully!')
        } catch (error: any) {
            console.error('Email verification error:', error)
            const errorMessage = error?.data?.message || 'Failed to verify email. Please check your code and try again.'
            setVerificationError(errorMessage)
            toast.error(errorMessage)
        }
    }

    const handleResendEmailVerification = async () => {
        try {
            setVerificationError(undefined)
            await sendVerificationEmail().unwrap()
            toast.success('Verification email sent!')
        } catch (error: any) {
            console.error('Send verification error:', error)
            const errorMessage = error?.data?.message || 'Failed to send verification email. Please try again.'
            setVerificationError(errorMessage)
            toast.error(errorMessage)
        }
    }

    const handleChangePassword = async (currentPassword: string, newPassword: string) => {
        setLoading(true)
        console.log('Changing password')
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            toast.success('Password changed successfully!')
            // TODO: Implement actual password change logic
        }, 1000)
    }

    const handleAddPhone = (phoneNumber: string) => {
        console.log('Adding phone:', phoneNumber)
        toast.success('Verification code sent to phone!')
        // TODO: Implement actual add phone logic
    }

    const handleVerifyPhone = (code: string) => {
        console.log('Verifying phone with code:', code)
        toast.success('Phone verified successfully!')
        // TODO: Implement actual phone verification logic
    }

    const handleUpdatePhone = (phoneNumber: string) => {
        console.log('Updating phone:', phoneNumber)
        toast.success('Phone updated! Verification code sent.')
        // TODO: Implement actual phone update logic
    }

    const handleUpdateNotifications = (notifications: boolean) => {
        console.log('Email notifications:', notifications)
        toast.success('Notification preferences updated!')
        // TODO: Implement actual notification preferences update
    }

    const handleUpdateMarketing = (marketing: boolean) => {
        console.log('Marketing emails:', marketing)
        toast.success('Marketing preferences updated!')
        // TODO: Implement actual marketing preferences update
    }

    if (isLoadingUser) {
        return (
            <div className="w-full">
                <SiteHeader
                    title="Account Settings"
                    description="Manage your account security and preferences."
                />
                <div className="max-w-4xl mx-auto px-4 lg:px-6 py-4 md:gap-6 md:py-6">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <SiteHeader
                title="Account Settings"
                description="Manage your account security and preferences."
            />
            {/* Added max-w-4xl and mx-auto to center content with max width */}
            <div className="max-w-4xl mx-auto px-4 lg:px-6 py-4 md:gap-6 md:py-6 space-y-6">
                <Separator/>

                {/* Email Verification */}
                <EmailVerification
                    verified={currentUser?.emailVerified ?? false}
                    email={currentUser?.email ?? user?.email}
                    onVerify={handleVerifyEmail}
                    onResend={handleResendEmailVerification}
                    error={verificationError}
                    sending={isSendingVerification}
                />

                <Separator/>

                {/* Change Password */}
                <ChangePassword onChangePassword={handleChangePassword} loading={loading}/>

                <Separator/>

                {/* Email Settings */}
                <EmailSettings
                    email={currentUser?.email ?? user?.email}
                    emailNotifications={true}
                    marketingEmails={currentUser?.marketingEmails ?? false}
                    onUpdateNotifications={handleUpdateNotifications}
                    onUpdateMarketing={handleUpdateMarketing}
                />

                {user?.role === UserRole.ADMIN && (
                    <>
                        <Separator/>
                        <PhoneSettings
                            user={{
                                phoneNumber: currentUser?.phoneNumber ?? null,
                                phoneVerified: false,
                            }}
                            onAddPhone={handleAddPhone}
                            onVerifyCode={handleVerifyPhone}
                            onUpdatePhone={handleUpdatePhone}
                            error={null}
                            loading={false}
                        />
                    </>
                )}
            </div>
        </div>
    )
}