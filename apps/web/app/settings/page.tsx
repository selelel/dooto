import AccountSection from "./_component/setting-account-section";
import AppearanceSection from "./_component/setting-appearance-section";
import ChangePasswordSection from "./_component/setting-change-password-section";
import DataPrivacySection from "./_component/setting-data-privacy-section";
import NotificationsSection from "./_component/setting-notification-section";
import ProfileSection from "./_component/setting-profile-section";

export default function SettingsPage() {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-4xl mb-2'>Settings ⚙️</h1>
        <p className='text-muted-foreground'>
          Customize your experience and manage your preferences
        </p>
      </div>

      <ProfileSection />
      <ChangePasswordSection />
      <NotificationsSection />
      <AppearanceSection />
      <DataPrivacySection />
      <AccountSection />
    </div>
  );
}
