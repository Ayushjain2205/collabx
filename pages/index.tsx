import clsx from "clsx";
import { GetServerSideProps } from "next";
import { ComponentProps, ReactNode } from "react";
import { DASHBOARD_URL } from "../constants";
import { SignInIcon } from "../icons";
import { MarketingLayout } from "../layouts/Marketing";
import { signIn } from "next-auth/react";
import * as Server from "../lib/server";
import { Button, LinkButton } from "../primitives/Button";
import { Container } from "../primitives/Container";
import styles from "./index.module.css";

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
}

function Feature({ title, description, className, ...props }: FeatureProps) {
  return (
    <div className={clsx(className, styles.featuresFeature)} {...props}>
      <h4 className={styles.featuresFeatureTitle}>{title}</h4>
      <p className={styles.featuresFeatureDescription}>{description}</p>
    </div>
  );
}

export default function Index() {
  return (
    <MarketingLayout>
      <Container className={styles.section}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className={styles.heroInfo}>
            <h1 className={styles.heroTitle}>
              CollabX, the anonymous collaboration platform
            </h1>
            <p className={styles.heroLead}>
              Our mission is to provide guidance and collaboration to
              individuals who are traditionally underrepresented in the tech
              community.
            </p>
          </div>
          <div>
            <img
              style={{
                width: "400px",
              }}
              src="landing.svg"
              alt=""
            />
          </div>
        </div>

        <div className={styles.heroActions}>
          <Button icon={<SignInIcon />} onClick={() => signIn()}>
            Sign in
          </Button>
        </div>
      </Container>
      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <Feature
            description={
              <>
                Connects mentees with mentors based on their skills, interests,
                and goals, without revealing their identities.
              </>
            }
            title="Anonymous Mentor Matching"
          />
          <Feature
            description={
              <>
                Supportive community of mentees who can connect with each other,
                share experiences.
              </>
            }
            title="Community Support"
          />
          <Feature
            description={
              <>
                Comprehensive resource library with tutorials, articles, and
                other helpful resources.
              </>
            }
            title="Resource Library"
          />
        </div>
      </Container>
    </MarketingLayout>
  );
}

// If logged in, redirect to dashboard
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await Server.getServerSession(req, res);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: DASHBOARD_URL,
      },
    };
  }

  return {
    props: {},
  };
};
