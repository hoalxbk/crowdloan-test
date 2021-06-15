import React from 'react';
import useStyles from '../PrivacyPolicy/style';
import LandingLayout from "../../components/Layout/LandingLayout";

const PolkaSmithPrivacyPolicy: React.FC<any> = (props: any) => {
  const styles = useStyles();

  return (
      <LandingLayout>
    <div className={styles.privacyPolicy}>
      <h1 className={styles.header}>Privacy Policy</h1>
      <p className={styles.subHeader}>Last Updated: [May 20, 2021]</p>
      <section className={styles.policyDesc}>
        <p>
          This Privacy Policy describes how PolkaSmith (referred to herein as “PolkaSmith”, “we”, “us” or “our”), will manage end user’s personal data collected. By accessing the platform and using our services, you consent to the collection, storage, use, and disclosure of your personal data, in accordance with this Privacy Policy. We will not collect any information from you, except where it is knowingly and explicitly provided by you.
        </p>
        <p>
          PolkaSmith is committed to respecting your privacy and ensuring that the personal data we collect about you is protected and is used, stored and disclosed in accordance with this Privacy Policy. Please read this Policy carefully to understand our practices regarding your personal data and how we will treat it.
        </p>
      </section>
      <section className={styles.policyExplain}>
        <div>
          <h2>1. Reasons We Collect Your Data</h2>
          <p>
            PolkaSmith will collect your Personal Data only by lawful and fair means for the following purposes. One or more purposes may apply simultaneously.
          </p>
          <ul>
            <li>
              To verify your identity for security purposes;
            </li>
            <li>
              To provide services to you as a user, for example, processing your requests or managing your account;
            </li>
            <li>
              To update you on PolkaSmith crowdloan for Kusama parachain auctions
            </li>
            <li>
              To email you our newsletter or communicate with you in other form about our products or services that we think may be of interest to you;
            </li>
            <li>
              To comply with a legal or regulatory obligation.
            </li>
          </ul>
        </div>
        <div>
          <h2>2. Types of Data We Collect</h2>
          <p>
            2.1. The types of Personal Data that PolkaSmith may collect from you are:
          </p>
          <ul>
            <li>
              Your email address
            </li>
            <li>
              Your ERC20 address
            </li>
            <li>
              Your Kusama address
            </li>
          </ul>
          <p>
            2.2. With regard to each of your visits to our PolkaSmith platform and access to the services we may automatically collect the following information:
          </p>
          <ul>
            <li>
              Transaction data;
            </li>
            <li>
              The smart contract stored in your non-custodial wallet address;
            </li>
            <li>
              Technical data including IP address, time zone setting and locations, operating system, and other technologies on your device used to access the platform;
            </li>
            <li>
              Information about your visits, including the full Uniform Resource Locators (URL) clickstream to, through and from the PolkaSmith (including date and time);
            </li>
          </ul>
        </div>
        <div>
          <h2>3. Collection of Your Data</h2>
          <p>
            3.1. You directly provide PolkaSmith with most of the data we collect. We collect data and process data when you:
          </p>
          <ul>
            <li>
              Register for PolkaSmith crowdloan;
            </li>
            <li>
              Voluntarily complete a Client survey or provide feedback on any of our message boards or via email;
            </li>
            <li>
              Contact us, we will keep a record of the information shared during the correspondence.
            </li>
          </ul>
          <p>
            3.2. Additionally, we may receive information about you from publicly available sources and collect technical and usage data automatically when you use our services. For example, we may aggregate your usage data to calculate the percentage of users accessing a specific feature of the services.
          </p>
        </div>
        <div>
          <h2>4. Management of Your Data</h2>
          <p>
            4.1.PolkaSmith will take all reasonable steps to ensure that the Personal Data which it collects, uses or discloses is correct and is stored in a secure environment which is accessed only by authorised persons.
          </p>
          <p>
            4.2. PolkaSmith will destroy or permanently de-identify the Personal Data we hold when it is no longer required for any purpose permitted.
          </p>
        </div>
        <div>
          <h2>5. Security of Your Data</h2>
          <p>
            5.1. The security of your Personal Data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is totally secure. Therefore, we cannot warrant its absolute security of any information which you transmit.
          </p>
          <p>
            5.2. However, we strive to use commercially acceptable means to protect your Personal Data, from misuse, loss and unauthorised access, modification and disclosure including by using password protected systems and databases and security technology. PolkaSmith employees, agents and contractors are required to maintain the confidentiality of users’ Personal Information and trading behaviour. We will comply with the requirements of applicable laws in the event of a data or security risk.
          </p>
        </div>
        <div>
          <h2>6. Law Enforcement</h2>
          <p>
            Under certain circumstances,PolkaSmith may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
          </p>
        </div>
        <div>
          <h2>7. Link to Other Third Parties</h2>
          <p>
            Our Services may contain links to other websites that are not operated by us. If you click on a third party link, you will be directed to that third party’s site. Please check their policies before you submit any personal data to such websites or use their services. Your relationship with these third parties and their services and tools is independent of your relationship with us. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
          </p>
        </div>
        <div>
          <h2>8. Contact Details</h2>
          <p>
            If you believe that someone has provided us with your Personal Data and you would like to request that it be removed from our database, please contact us at our contact email as specified below. Besides, if you have any queries, requests for access or correction or complaints relating to the handling of your personal data, please also contact us by email.
          </p>
          <p>
            Email: <a href="mailto:support@polkafoundry.com" style={{ color: '#3232DC' }}>support@polkafoundry.com</a>
          </p>
        </div>
      </section>
    </div>
      </LandingLayout>
  )
}

export default PolkaSmithPrivacyPolicy;
