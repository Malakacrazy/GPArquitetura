import React from 'react';
import { motion } from 'motion/react';
import { images } from '../../config/assets';

export function ToS() {
  return (
    <main className="min-h-screen w-full">
      <section className="min-h-screen w-full flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">
        {/* Left Content - Scrollable */}
        <div className="flex flex-col justify-between p-6 md:p-12 lg:w-1/2 lg:p-16 xl:p-20 min-h-[50vh] lg:min-h-full bg-[var(--color-background)] lg:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[var(--color-background)] [&::-webkit-scrollbar-thumb]:bg-[var(--color-primary)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[var(--color-accent)]">
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
                Leia atentamente estes Termos de Serviço (“Termos”, “Termos de Serviço”) antes de utilizar o site https://www.gparquitetura.vercel.app (o “Serviço”) operado pela Giulia Parente Arquitetura (“nós”, “nos” ou “nosso”).
              </p>
              <p className="text-base md:text-lg">
                O seu acesso e utilização do Serviço estão condicionados à sua aceitação e conformidade com estes Termos. Estes Termos se aplicam a todos os visitantes, usuários e outras pessoas que acessam ou utilizam o Serviço.
              </p>
              <p className="text-base md:text-lg">
                Ao acessar ou utilizar o Serviço, você concorda em se comprometer com estes Termos. Caso discorde de qualquer parte dos termos, você não poderá acessar o Serviço.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Links para outros sites
              </h6>
              <p className="text-base md:text-lg">
                Nosso Serviço pode conter links para sites ou serviços de terceiros que não são de propriedade ou controlados pela Giuia Parente Arquitetura.
              </p>
              <p className="text-base md:text-lg">
                A Giuia Parente Arquitetura não tem controle e não assume responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou serviços de terceiros. Você também reconhece e concorda que a Giuia Parente Arquitetura não será responsável, direta ou indiretamente, por qualquer dano ou perda causada ou alegadamente causada por ou em conexão com o uso ou confiança em qualquer conteúdo, bens ou serviços disponíveis em ou através de tais sites ou serviços.
              </p>
              <p className="text-base md:text-lg">
                Recomendamos enfaticamente que você leia os termos e condições e as políticas de privacidade de quaisquer sites ou serviços de terceiros que visitar.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Lei aplicável
              </h6>
              <p className="text-base md:text-lg">
                Estes Termos serão regidos e interpretados de acordo com as leis de São Paulo, Brasil, sem levar em consideração suas disposições sobre conflitos de leis.
              </p>
              <p className="text-base md:text-lg">
                Nossa falha em fazer valer qualquer direito ou disposição destes Termos não será considerada uma renúncia a esses direitos. Se qualquer disposição destes Termos for considerada inválida ou inexequível por um tribunal, as demais disposições destes Termos permanecerão em vigor. Estes Termos constituem o acordo completo entre nós em relação ao nosso Serviço e substituem e revogam quaisquer acordos anteriores que possamos ter entre nós em relação ao Serviço.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Alterações
              </h6>
              <p className="text-base md:text-lg">
                Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for significativa, tentaremos fornecer um aviso prévio de pelo menos 30 dias antes de quaisquer novos termos entrarem em vigor. O que constitui uma alteração significativa será determinado a nosso exclusivo critério.
              </p>
              <p className="text-base md:text-lg">
                Ao continuar a acessar ou usar nosso Serviço após essas revisões entrarem em vigor, você concorda em se comprometer com os termos revisados. Se você não concordar com os novos termos, interrompa o uso do Serviço.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Propriedade intelectual
              </h6>
              <p className="text-base md:text-lg">
                Os sites contêm materiais, como vídeos, fotografias, textos, gráficos, imagens e outros materiais fornecidos pela 53.554.180 Giuia Pessanha Parente ou em seu nome (coletivamente referidos como o “Conteúdo”). O Conteúdo pode ser de nossa propriedade ou de terceiros. O Conteúdo é protegido pelas leis australianas e estrangeiras. O uso não autorizado do Conteúdo pode violar leis de direitos autorais, marcas registradas e outras leis.
              </p>
              <p className="text-base md:text-lg">
                Os visitantes podem visualizar todo o Conteúdo disponível publicamente para seu uso pessoal e não comercial. Os visitantes não têm outros direitos sobre o Conteúdo e você não utilizará o Conteúdo, exceto conforme permitido por este Contrato. Nenhum outro uso é permitido sem o consentimento prévio por escrito da 53.554.180 Giuia Pessanha Parente. A 53.554.180 Giuia Pessanha Parente detém todos os direitos, títulos e interesses, incluindo todos os direitos de propriedade intelectual, sobre o Conteúdo. Você deve manter todos os avisos de direitos autorais e outros avisos de propriedade contidos no Conteúdo original. Você não pode vender, transferir, ceder, licenciar, sublicenciar ou modificar o Conteúdo, nem reproduzir, exibir, executar publicamente, criar uma versão derivada, distribuir ou usar o Conteúdo de qualquer outra forma para qualquer finalidade pública ou comercial. O uso ou a publicação do Conteúdo em qualquer outro site, página de mídia social ou em um ambiente de computador em rede para qualquer finalidade é expressamente proibido.
              </p>
              <p className="text-base md:text-lg">
                Se você violar qualquer parte deste Contrato, sua permissão para acessar e/ou utilizar o Conteúdo e os Sites será automaticamente rescindida e você deverá destruir imediatamente todas as cópias que tiver feito do Conteúdo.
              </p>
              <p className="text-base md:text-lg">
                As marcas registradas, marcas de serviço e logotipos da 53.554.180 Giuia Pessanha Parente usados e exibidos nos sites são marcas registradas e não registradas ou marcas de serviço da 53.554.180 Giuia Pessanha Parente Outros nomes de empresas, produtos e serviços localizados nos sites podem ser marcas registradas ou marcas de serviço de propriedade de terceiros (as “Marcas Registradas de Terceiros” e, coletivamente com as Marcas Registradas da 53.554.180 Giuia Pessanha Parente, as “Marcas Registradas”). Nada nos sites deve ser interpretado como concessão, por implicação, preclusão ou de outra forma, de qualquer licença ou direito de uso das Marcas Registradas, sem nossa permissão prévia por escrito específica para cada uso. O uso das Marcas Registradas como parte de um link para ou de qualquer site é proibido, a menos que o estabelecimento de tal link seja aprovado previamente por nós por escrito. Toda a boa vontade gerada pelo uso das Marcas Registradas da 53.554.180 Giuia Pessanha Parente reverte em nosso benefício.
              </p>
              <p className="text-base md:text-lg">
                Os elementos dos sites são protegidos por leis de imagem comercial, marcas registradas, concorrência desleal e outras leis estaduais e federais e não podem ser copiados ou imitados, no todo ou em parte, por qualquer meio, incluindo, mas não se limitando ao uso de framing ou mirrors. Nenhum conteúdo pode ser retransmitido sem o nosso consentimento expresso por escrito para cada caso específico.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Contato
              </h6>
              <p className="text-base md:text-lg">
                Se houver alguma dúvida sobre esta política de privacidade, entre em contato conosco usando as informações abaixo.
              </p>
              <p className="text-base md:text-lg">
                <a href="http://www.gparquitetura.vercel.app" className="text-[var(--color-primary)] underline">www.gparquitetura.vercel.app</a>
              </p>
              <p className="text-base md:text-lg">
                <a href="mailto:giuliap.arquitetura@gmail.com" className="text-[var(--color-primary)] underline">giuliap.arquitetura@gmail.com</a>
              </p>
            </motion.div>
          </div>

          {/* Bottom Section - Large heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase leading-[0.95] tracking-tight text-[var(--color-text-dark)] break-words"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            Termos
            <br />
            de Uso
          </motion.h1>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[50vh] md:h-[45vh] lg:w-1/2 lg:h-full overflow-hidden flex items-center justify-center bg-[var(--color-background)] p-4 lg:p-8 xl:p-12">
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