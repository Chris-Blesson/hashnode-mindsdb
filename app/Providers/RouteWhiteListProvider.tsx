"use client";
import useAccountContext from "../hooks/useAccountContext";
import { usePathname, useRouter } from "next/navigation";

const routeRegex = {
  learn: /\/learn/,
  lessonDetails: /\/learn\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
  practice: /\/practice/,
  practiceDetails: /\/practice\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
  contests: /^\/contests$/,
  contestCreation: /^\/contests\/new$/,
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
  routeRegex.contestCreation,
  routeRegex.profile,
];
const RouteWhitelister = ({ children }) => {
  const { account_type } = useAccountContext();
  const pathName = usePathname();
  const router = useRouter();
  if (!account_type) {
    return null;
  }
  if (account_type === "candidate") {
    console.log("iscandidate", account_type);
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
