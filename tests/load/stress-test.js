import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  scenarios: {
    cohort_smoke: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "30s", target: 28 },
        { duration: "45s", target: 56 },
        { duration: "45s", target: 84 },
        { duration: "30s", target: 0 },
      ],
      gracefulRampDown: "10s",
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<1500"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://127.0.0.1:3000";
const EXERCISE_PATHS = [
  "/deepreal/exercise/1",
  "/mental-health/exercise/1",
  "/religion-hub/exercise/1",
  "/dashboard",
];

export default function cohortSmoke() {
  const path = EXERCISE_PATHS[(__VU - 1) % EXERCISE_PATHS.length];
  const pageResponse = http.get(`${BASE_URL}${path}`);

  check(pageResponse, {
    "page responded with 200": (response) => response.status === 200,
    "page served html": (response) => response.body && response.body.includes("<!DOCTYPE html>"),
  });

  const forensicResponse = http.get(`${BASE_URL}/api/forensic/health`);
  check(forensicResponse, {
    "forensic health is reachable": (response) => response.status === 200,
  });

  const arabicResponse = http.post(
    `${BASE_URL}/api/nlp/arabic`,
    JSON.stringify({
      text: "هذا نص تجريبي للتحقق من مسار تحليل العربية تحت الضغط.",
      mode: "sentiment",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  check(arabicResponse, {
    "arabic nlp returns success": (response) => response.status === 200,
  });

  sleep(1);
}
