import { useEffect, ComponentType } from "react";
import { useAppContext } from "@/app/appContext";
import { useRouter } from "next/navigation";

const withProtectedRoute = <P extends ComponentType>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const router = useRouter();
    const { user, isLoading } = useAppContext();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/login");
      }
    }, [user, isLoading]);

    if (!user) {
      return <div>Redirecting to Login pages...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;
