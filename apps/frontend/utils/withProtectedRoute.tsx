import { useEffect, ComponentType } from "react";
import { useAppContext } from "@/app/appContext";
import { useRouter } from "next/navigation";

const withProtectedRoute = <P extends ComponentType>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const router = useRouter();
    const { user } = useAppContext();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return <div>Redirecting to Login pages...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;
