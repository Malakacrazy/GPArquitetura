import React from 'react';
import { motion } from 'motion/react';
import { images } from '../../config/assets';

export function ToS() {
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
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the https://oharchitecture.com.au/ website (the "Service") operated by OH Architecture ("us", "we", or "our").
              </p>
              <p className="text-base md:text-lg">
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
              </p>
              <p className="text-base md:text-lg">
                By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Links To Other Web Sites
              </h6>
              <p className="text-base md:text-lg">
                Our Service may contain links to third-party web sites or services that are not owned or controlled by OH Architecture.
              </p>
              <p className="text-base md:text-lg">
                OH Architecture has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that OH Architecture shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
              </p>
              <p className="text-base md:text-lg">
                We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Governing Law
              </h6>
              <p className="text-base md:text-lg">
                These Terms shall be governed and construed in accordance with the laws of Queensland, Australia, without regard to its conflict of law provisions.
              </p>
              <p className="text-base md:text-lg">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Changes
              </h6>
              <p className="text-base md:text-lg">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p className="text-base md:text-lg">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Intellectual Property
              </h6>
              <p className="text-base md:text-lg">
                The Websites contain material, such as videos, photographs, text, graphics, images and other material provided by or on behalf of OH Architecture Pty. Ltd. (collectively referred to as the "Content"). The Content may be owned by us or third parties. The Content is protected under both Australian and foreign laws. Unauthorized use of the Content may violate copyright, trademark, and other laws.
              </p>
              <p className="text-base md:text-lg">
                Visitors may view all publicly available Content for their own personal, non-commercial use. Visitors have no other rights in or to the Content and you will not use the Content except as permitted under this Agreement. No other use is permitted without the prior written consent of OH Architecture Pty. Ltd. OH Architecture Pty. Ltd. retains all right, title, and interest, including all intellectual property rights, in and to the Content. You must retain all copyright and other proprietary notices contained in the original Content. You may not sell, transfer, assign, license, sublicense, or modify the Content or reproduce, display, publicly perform, make a derivative version of, distribute, or otherwise use the Content in any way for any public or commercial purpose. The use or posting of the Content on any other website, social media page, or in a networked computer environment for any purpose is expressly prohibited.
              </p>
              <p className="text-base md:text-lg">
                If you violate any part of this Agreement, your permission to access and/or use the Content and the Websites automatically terminates and you must immediately destroy any copies you have made of the Content.
              </p>
              <p className="text-base md:text-lg">
                The trademarks, service marks, and logos of OH Architecture Pty. Ltd. used and displayed on the Websites are registered and unregistered trademarks or service marks of OH Architecture Pty. Ltd. Other company, product, and service names located on the Websites may be trademarks or service marks owned by others (the "Third-Party Trademarks", and, collectively with OH Architecture Pty. Ltd. Trademarks, the "Trademarks"). Nothing on the Websites should be construed as granting, by implication, estoppel, or otherwise, any license or right to use the Trademarks, without our prior written permission specific for each such use. Use of the Trademarks as part of a link to or from any site is prohibited unless establishment of such a link is approved in advance by us in writing. All goodwill generated from the use of OH Architecture Pty. Ltd. Trademarks inures to our benefit.
              </p>
              <p className="text-base md:text-lg">
                Elements of the Websites are protected by trade dress, trademark, unfair competition, and other state and federal laws and may not be copied or imitated in whole or in part, by any means, including, but not limited to, the use of framing or mirrors. None of the Content may be retransmitted without our express, written consent for each and every instance.
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
            Terms of
            <br />
            Service
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