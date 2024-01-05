"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import useAccountContext from "../hooks/useAccountContext";
import RegisterPath from "./Onboarding/RegisterPath";
import { usePathname, useRouter } from "next/navigation";

const routeRegex = {
  learn: /\/learn/,
  recommendations: /\/recommendations/,
  lessonDetails: /\/learn\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
  practice: /\/practice/,
  practiceDetails: /\/practice\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
  contests: /\/contests/,
  contestDetails: /\/contests\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
  contestAttempt:
    /\/contests\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\/attempt/,
  profile: /\/profile/,
  submissions: /\/submissions/,
  submissionDetails:
    /\/submissions\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
};
const candidateRoutes = [
  routeRegex.learn,
  routeRegex.lessonDetails,
  routeRegex.practice,
  routeRegex.practiceDetails,
  routeRegex.contests,
  routeRegex.contestDetails,
  routeRegex.contestAttempt,
  routeRegex.submissions,
  routeRegex.submissionDetails,
  routeRegex.profile,
];
const hiringManagerRoutes = [
  routeRegex.contests,
  routeRegex.contestDetails,
  routeRegex.profile,
  routeRegex.recommendations,
];
const RouteWhitelister = ({ children }) => {
  const { account_type } = useAccountContext();
  const { userId } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const accountId = userId;
  if (!account_type) {
    //Mount register component
    return <RegisterPath accountId={accountId} />;
  }

  if (account_type === "candidate") {
    const isRouteMatching = candidateRoutes.some((route) => {
      return route.test(pathName);
    });

    if (isRouteMatching) {
      return <>{children}</>;
    } else {
      router.replace("/learn");
    }
  } else {
    const isRouteMatching = hiringManagerRoutes.some((route) =>
      route.test(pathName)
    );
    if (isRouteMatching) {
      return <>{children}</>;
    } else {
      router.replace("/contests");
    }
  }
};

export default RouteWhitelister;
