import LoginForm from '@/components/LoginForm/LoginForm'; // Use the import alias

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black-100">
      <LoginForm />
    </div>
  );
}