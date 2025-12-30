import React from 'react';
import { motion } from 'motion/react';
import { images } from '../../config/assets';

export function PrivacyPolicy() {
  return (
    <main className="min-h-screen w-full">
      <section className="min-h-screen w-full flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">
        {/* Left Content - Scrollable */}
        <div className="flex flex-col justify-between p-6 md:p-12 lg:w-1/2 lg:p-16 xl:p-20 2xl:p-24 min-h-[50vh] lg:min-h-full bg-[var(--color-background)] lg:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[var(--color-background)] [&::-webkit-scrollbar-thumb]:bg-[var(--color-primary)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[var(--color-accent)]">
          {/* Top Section - Scrollable Content */}
          <div className="flex flex-col items-start gap-8 lg:gap-12 xl:gap-16 pb-8 lg:pb-12">
            {/* Rich Text Content */}
            <motion.div
              className="w-full text-[var(--color-text-dark)] space-y-3 text-justify"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <p className="text-base md:text-lg">
                This privacy policy has been compiled to better serve those who are concerned with how their &apos;Personally identifiable information&apos; (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context.
              </p>
              <p className="text-base md:text-lg">
                Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                What personal information do we collect from the people that visit our website?
              </h6>
              <p className="text-base md:text-lg">
                When using our site, as appropriate, you may be asked to enter your name, email address, or other information or other details to help you with your experience.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                How do we use your information?
              </h6>
              <p className="text-base md:text-lg">
                We may use the information we collect from you when you respond to a form or use certain other site features in the following ways:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li className="text-base md:text-lg">To personalise user&apos;s experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
                <li className="text-base md:text-lg">To improve our website in order to better serve you.</li>
              </ol>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                How do we protect visitor information?
              </h6>
              <p className="text-base md:text-lg">
                Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. We implement a variety of security measures when a user enters their information to maintain the safety of your personal information. We do not use Malware Scanning.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Do we use &apos;cookies&apos;?
              </h6>
              <p className="text-base md:text-lg">
                Yes. Cookies are small files that a site or its service provider transfers to your computer&apos;s hard drive through your Web browser (if you allow) that enables the site&apos;s or service provider&apos;s systems to recognize your browser and capture and remember certain information.
              </p>
              <p className="text-base md:text-lg">
                They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                We use cookies to:
              </h6>
              <p className="text-base md:text-lg">
                Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.
              </p>
              <p className="text-base md:text-lg">
                You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser (like Internet Explorer) settings. Each browser is a little different, so look at your browser&apos;s Help menu to learn the correct way to modify your cookies
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                If users disable cookies in their browser:
              </h6>
              <p className="text-base md:text-lg">
                If you disable cookies, some features will be disabled. It will turn off some of the features that make your site experience more efficient and some of our services will not function properly.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Third-party disclosure
              </h6>
              <p className="text-base md:text-lg">
                We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it&apos;s release is appropriate to comply with the law, enforce our site policies, or protect ours or others&apos; rights, property, or safety.
              </p>
              <p className="text-base md:text-lg">
                However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Third-party links
              </h6>
              <p className="text-base md:text-lg">
                Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Google
              </h6>
              <p className="text-base md:text-lg">
                Google&apos;s advertising requirements can be summed up by Google&apos;s Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                We have implemented the following:
              </h6>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-base md:text-lg">Google Analytics (GA4 – to track impressions and demographics)</li>
                <li className="text-base md:text-lg">Google Search Console (To track site visits, site ranking &amp; demographics)</li>
              </ul>
              <p className="text-base md:text-lg">
                We along with third-party vendors, such as Google use first-party cookies (such as the Google Analytics cookies) to compile data regarding user interactions with ad impressions and other ad service functions as they relate to our website.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Opting out:
              </h6>
              <p className="text-base md:text-lg">
                Users can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively, you can opt out by visiting the Network Advertising initiative opt out page or permanently using the Google Analytics Opt Out Browser add on.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                California Online Privacy Protection Act
              </h6>
              <p className="text-base md:text-lg">
                CalOPPA is the first state law in the United States to require commercial websites and online services to post a privacy policy.
              </p>
              <p className="text-base md:text-lg">
                The law&apos;s reach stretches well beyond California to require a person or company in the United States (and conceivably the world) that operates websites collecting personally identifiable information from Californian consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals with whom it is being shared, and to comply with this policy.
              </p>
              <p className="text-base md:text-lg">
                See more at: <a href="http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf" className="text-[var(--color-primary)] underline">http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf</a>
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                According to CalOPPA we agree to the following:
              </h6>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
                <li>Users can visit our site anonymously.</li>
                <li>Once this privacy policy is created, we will add a link to it on our home page or as a minimum on the first significant page after entering our website.</li>
                <li>Our Privacy Policy link includes the word &apos;Privacy&apos; and can be easily be found on the page specified above.</li>
                <li>Users will be notified of any privacy policy changes on our Privacy Policy Page</li>
                <li>Users are able to change their personal information by emailing us or by logging in to their account</li>
              </ul>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                How does our site handle do not track signals and behavioural tracking?
              </h6>
              <p className="text-base md:text-lg">
                We don&apos;t honor do not track signals, behavioural tracking and do not track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place. We don&apos;t honor them because at the time of writing we have not implemented this functionality.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Children
              </h6>
              <p className="text-base md:text-lg">
                We do not knowingly collect Personal Information from children under the age of 18 through the Websites. If you are under 18, please do not give us any Personal Information.
              </p>
              <p className="text-base md:text-lg">
                We encourage parents and legal guardians to monitor their children&apos;s Internet usage and to help enforce our Privacy Policy by instructing their children to never provide Personal Information through the Websites without their permission.
              </p>
              <p className="text-base md:text-lg">
                If you have reason to believe that a child under the age of 18 has provided Personal Information to us, please contact us, and we will endeavour to delete that information from our databases.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Fair Information Practices
              </h6>
              <p className="text-base md:text-lg">
                The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:
              </h6>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
                <li>We will notify the users via email within 1 business day</li>
                <li>We will notify the users via in-site notification within 1 business day</li>
              </ul>
              <p className="text-base md:text-lg">
                We also agree to the Individual Redress Principle, which requires that individuals have a right to pursue legally enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                CAN SPAM Act
              </h6>
              <p className="text-base md:text-lg">
                The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                We collect your email address in order to:
              </h6>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-base md:text-lg">Send information, respond to inquiries, and/or other requests or questions.</li>
                <li className="text-base md:text-lg">Process orders and to send information and updates pertaining to orders.</li>
                <li className="text-base md:text-lg">We may also send you additional information related to your product and/or service.</li>
                <li className="text-base md:text-lg">Market to our mailing list or continue to send emails to our clients after the original transaction has occurred.</li>
              </ul>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                To be in accordance with CANSPAM we agree to the following:
              </h6>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
                <li>NOT use false or misleading subjects or email addresses.</li>
                <li>Identify the message as an advertisement in some reasonable way.</li>
                <li>Include the physical address of our business or site headquarters.</li>
                <li>Monitor third-party email marketing services for compliance, if one is used.</li>
                <li>Honor opt-out/unsubscribe requests quickly.</li>
                <li>Allow users to unsubscribe by using the link at the bottom of each email.</li>
              </ul>
              <p className="text-base md:text-lg">
                If at any time you would like to unsubscribe from receiving future emails, you can email us or follow the instructions at the bottom of each email and we will promptly remove you from ALL correspondence.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Contacting Us
              </h6>
              <p className="text-base md:text-lg">
                If there are any questions regarding this privacy policy you may contact us using the information below.
              </p>
              <p className="text-base md:text-lg">
                <a href="http://www.oharchitecture.com.au" className="text-[var(--color-primary)] underline">www.oharchitecture.com.au</a>
              </p>
              <p className="text-base md:text-lg">
                101 Days Road, Grange QLD 4051 Australia
              </p>
              <p className="text-base md:text-lg">
                <a href="mailto:info@oharchitecture.com.au" className="text-[var(--color-primary)] underline">info@oharchitecture.com.au</a>
              </p>
            </motion.div>
          </div>

          {/* Bottom Section - Large heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl uppercase leading-[0.95] tracking-tight text-[var(--color-text-dark)] break-words"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            Privacy
            <br />
            Policy
          </motion.h1>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[50vh] md:h-[45vh] lg:w-1/2 lg:h-full overflow-hidden flex items-center justify-center bg-[var(--color-background)] p-4 lg:p-8 xl:p-12 2xl:p-16">
          <motion.img
            src={images.notFound.hero.src}
            loading="eager"
            alt={images.notFound.hero.alt}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </section>
    </main>
  );
}