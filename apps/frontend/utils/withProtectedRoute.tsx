import { useEffect, ComponentType } from "react";
import { useAppContext } from "@/app/appContext";
import { useRouter } from "next/navigation";

const withProtectedRoute = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  const WithProtectedRoute: ComponentType<P> = (props: P) => {
    const router = useRouter();
    const { user, isLoading } = useAppContext();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/login");
      }
    }, [user, isLoading, router]);

    if (!user) {
      return <div>Redirecting to Login page...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  WithProtectedRoute.displayName = `WithProtectedRoute(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithProtectedRoute;
};

export default withProtectedRoute;
