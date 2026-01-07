/**
 * PrivacyPolicy Component
 *
 * Displays the complete privacy policy for GP Arquitetura in a split-screen layout.
 * Covers data collection, cookies, third-party services, and user rights.
 *
 * @module components/legal/PrivacyPolicy
 * @since 1.0.0
 *
 * Legal Compliance:
 * - CalOPPA (California Online Privacy Protection Act)
 * - CAN-SPAM Act
 * - LGPD (Lei Geral de Proteção de Dados - Brazil)
 * - Fair Information Practices
 *
 * Features:
 * - Scrollable text content with styled scrollbar
 * - Split-screen layout (text + image)
 * - Responsive design for all screen sizes
 * - Animated content reveal
 *
 * @example
 * ```tsx
 * <PrivacyPolicy />
 * ```
 */
import React from 'react';
import { motion } from 'motion/react';
import { images } from '../../config/assets';
import { contact } from '../../config/contact';

export function PrivacyPolicy() {
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
                Esta política de privacidade foi elaborada para melhor atender aqueles que estão preocupados com a forma como suas “informações de identificação pessoal” (PII) são utilizadas online. PII, conforme utilizado na legislação de privacidade e segurança da informação dos EUA, refere-se a informações que podem ser utilizadas isoladamente ou em conjunto com outras informações para identificar, contatar ou localizar uma única pessoa, ou para identificar um indivíduo em um determinado contexto.
              </p>
              <p className="text-base md:text-lg">
                Leia nossa política de privacidade com atenção para entender claramente como coletamos, usamos, protegemos ou tratamos suas informações de identificação pessoal de acordo com nosso site.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Que informações pessoais coletamos das pessoas que visitam nosso site?
              </h6>
              <p className="text-base md:text-lg">
                Ao utilizar nosso site, conforme apropriado, você pode ser solicitado a inserir seu nome, endereço de e-mail ou outras informações ou detalhes para auxiliar na sua experiência.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Como utilizamos suas informações?
              </h6>
              <p className="text-base md:text-lg">
                Podemos utilizar as informações que coletamos de você quando você responde a um formulário ou utiliza determinados outros recursos do site das seguintes maneiras:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li className="text-base md:text-lg">Para personalizar a experiência do usuário e nos permitir fornecer o tipo de conteúdo e ofertas de produtos nos quais você está mais interessado.</li>
                <li className="text-base md:text-lg">Para melhorar nosso site a fim de melhor atendê-lo.</li>
              </ol>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Como protegemos as informações dos visitantes?
              </h6>
              <p className="text-base md:text-lg">
                Suas informações pessoais estão contidas em redes seguras e só podem ser acessadas por um número limitado de pessoas que têm direitos especiais de acesso a esses sistemas e são obrigadas a manter a confidencialidade das informações. Implementamos uma variedade de medidas de segurança quando um usuário insere suas informações para manter a segurança de suas informações pessoais. Não utilizamos varredura de malware.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Utilizamos “cookies”?
              </h6>
              <p className="text-base md:text-lg">
                Sim. Cookies são pequenos arquivos que um site ou seu provedor de serviços transfere para o disco rígido do seu computador através do seu navegador da Web (se você permitir), permitindo que os sistemas do site ou do provedor de serviços reconheçam seu navegador e capturem e lembrem determinadas informações.
              </p>
              <p className="text-base md:text-lg">
                Eles também são utilizados para nos ajudar a entender suas preferências com base na atividade anterior ou atual do site, o que nos permite fornecer serviços aprimorados. Também utilizamos cookies para nos ajudar a compilar dados agregados sobre o tráfego e a interação do site, para que possamos oferecer melhores experiências e ferramentas no futuro.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Utilizamos cookies para:
              </h6>
              <p className="text-base md:text-lg">
                Compilar dados agregados sobre o tráfego e as interações do site, a fim de oferecer melhores experiências e ferramentas no futuro. Também podemos utilizar serviços de terceiros confiáveis que rastreiam essas informações em nosso nome.
              </p>
              <p className="text-base md:text-lg">
                Você pode optar por receber um aviso do seu computador sempre que um cookie for enviado ou pode optar por desativar todos os cookies. Você pode fazer isso nas configurações do seu navegador (como o Internet Explorer). Cada navegador é um pouco diferente, portanto, consulte o menu Ajuda do seu navegador para saber a maneira correta de modificar seus cookies.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Se os usuários desativarem os cookies em seus navegadores:
              </h6>
              <p className="text-base md:text-lg">
                Se você desativar os cookies, alguns recursos serão desativados. Isso desativará alguns dos recursos que tornam sua experiência no site mais eficiente e alguns de nossos serviços não funcionarão corretamente.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Divulgação a terceiros
              </h6>
              <p className="text-base md:text-lg">
                Não vendemos, comercializamos ou transferimos de outra forma a terceiros suas informações pessoais identificáveis, a menos que forneçamos aos usuários um aviso prévio. Isso não inclui parceiros de hospedagem de sites e outras partes que nos auxiliam na operação do nosso site, na condução dos nossos negócios ou no atendimento aos nossos usuários, desde que essas partes concordem em manter essas informações confidenciais. Também podemos divulgar informações quando tal for apropriado para cumprir a lei, aplicar as políticas do nosso site ou proteger os nossos direitos, propriedade ou segurança ou os de terceiros.
              </p>
              <p className="text-base md:text-lg">
                No entanto, informações não pessoais identificáveis dos visitantes podem ser fornecidas a terceiros para fins de marketing, publicidade ou outros usos.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Links de terceiros
              </h6>
              <p className="text-base md:text-lg">
                Ocasionalmente, a nosso critério, podemos incluir ou oferecer produtos ou serviços de terceiros em nosso site. Esses sites de terceiros têm políticas de privacidade separadas e independentes. Portanto, não nos responsabilizamos pelo conteúdo e pelas atividades desses sites vinculados. No entanto, buscamos proteger a integridade do nosso site e agradecemos qualquer feedback sobre esses sites.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Google
              </h6>
              <p className="text-base md:text-lg">
                Os requisitos de publicidade do Google podem ser resumidos pelos Princípios de Publicidade do Google. Eles foram criados para proporcionar uma experiência positiva aos usuários. <a href="https://support.google.com/adwordspolicy/answer/1316548?hl=en" className="text-[var(--color-primary)] underline">https://support.google.com/adwordspolicy/answer/1316548?hl=en</a>
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Implementamos o seguinte:
              </h6>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-base md:text-lg">Google Analytics (GA4 – para rastrear impressões e dados demográficos)</li>
                <li className="text-base md:text-lg">Google Search Console (para rastrear visitas ao site, classificação do site e dados demográficos)</li>
              </ul>
              <p className="text-base md:text-lg">
                Juntamente com fornecedores terceirizados, como o Google, utilizamos cookies primários (como os cookies do Google Analytics) para compilar dados sobre as interações dos usuários com impressões de anúncios e outras funções de serviços de publicidade relacionadas ao nosso site.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Desativação:
              </h6>
              <p className="text-base md:text-lg">
                Os usuários podem definir preferências sobre como o Google exibe anúncios para você na página Configurações de anúncios do Google. Alternativamente, você pode desativar essa opção visitando a página de desativação da Network Advertising Initiative ou utilizando permanentemente o complemento do navegador para desativação do Google Analytics.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Lei de Proteção à Privacidade Online da Califórnia (CalOPPA)
              </h6>
              <p className="text-base md:text-lg">
                A CalOPPA é a primeira lei estadual dos Estados Unidos a exigir que sites comerciais e serviços online publiquem uma política de privacidade.
              </p>
              <p className="text-base md:text-lg">
                O alcance da lei se estende muito além da Califórnia, exigindo que qualquer pessoa ou empresa nos Estados Unidos (e, possivelmente, no mundo) que opere sites que coletem informações de identificação pessoal de consumidores californianos publique uma política de privacidade bem visível em seu site, informando exatamente quais informações estão sendo coletadas e com quem elas estão sendo compartilhadas, e que cumpra essa política.
              </p>
              <p className="text-base md:text-lg">
                Veja mais em: <a href="http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf" className="text-[var(--color-primary)] underline">http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf</a>
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                De acordo com a CalOPPA, concordamos com o seguinte:
              </h6>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
                <li>Os usuários podem visitar nosso site anonimamente.</li>
                <li>Assim que esta política de privacidade for criada, adicionaremos um link para ela em nossa página inicial ou, no mínimo, na primeira página significativa após entrar em nosso site.</li>
                <li>Nosso link de Política de Privacidade inclui a palavra “Privacidade” e pode ser facilmente encontrado na página especificada acima.</li>
                <li>Os usuários serão notificados sobre quaisquer alterações na política de privacidade em nossa página de Política de Privacidade.</li>
                <li>Os usuários podem alterar suas informações pessoais enviando-nos um e-mail ou fazendo login em sua conta.</li>
              </ul>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Como nosso site lida com sinais de não rastreamento e rastreamento comportamental?
              </h6>
              <p className="text-base md:text-lg">
                Não honramos sinais de não rastreamento, rastreamento comportamental e não rastreamos, plantamos cookies ou usamos publicidade quando um mecanismo de navegador Do Not Track (DNT) está em vigor. Não os honramos porque, no momento da redação, não implementamos essa funcionalidade.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Crianças
              </h6>
              <p className="text-base md:text-lg">
                Não coletamos intencionalmente Informações Pessoais de crianças menores de 18 anos através dos sites. Se você tem menos de 18 anos, não nos forneça nenhuma Informação Pessoal.
              </p>
              <p className="text-base md:text-lg">
                Incentivamos os pais e responsáveis legais a monitorar o uso da Internet por seus filhos e a ajudar a aplicar nossa Política de Privacidade, instruindo seus filhos a nunca fornecerem Informações Pessoais através dos sites sem sua permissão.
              </p>
              <p className="text-base md:text-lg">
                Se você tiver motivos para acreditar que uma criança menor de 18 anos nos forneceu Informações Pessoais, entre em contato conosco e faremos o possível para excluir essas informações de nossos bancos de dados.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Práticas justas de informação
              </h6>
              <p className="text-base md:text-lg">
                Os Princípios de Práticas Justas de Informação constituem a espinha dorsal da lei de privacidade nos Estados Unidos e os conceitos que incluem têm desempenhado um papel significativo no desenvolvimento de leis de proteção de dados em todo o mundo. Compreender os Princípios de Práticas Justas de Informação e como devem ser implementados é fundamental para cumprir as várias leis de privacidade que protegem as informações pessoais.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Para estar em conformidade com as Práticas Justas de Informação, tomaremos as seguintes medidas responsivas, caso ocorra uma violação de dados:
              </h6>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
                <li>Notificaremos os usuários por e-mail dentro de um dia útil</li>
                <li>Notificaremos os usuários por meio de uma notificação no site dentro de um dia útil</li>
              </ul>
              <p className="text-base md:text-lg">
                Também concordamos com o Princípio de Reparação Individual, que exige que os indivíduos tenham o direito de exercer direitos legalmente exigíveis contra coletores e processadores de dados que não cumpram a lei. Este princípio exige não só que os indivíduos tenham direitos aplicáveis contra os usuários de dados, mas também que os indivíduos tenham recurso a tribunais ou agências governamentais para investigar e/ou processar o não cumprimento por parte dos processadores de dados.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Lei CAN SPAM
              </h6>
              <p className="text-base md:text-lg">
                A Lei CAN-SPAM é uma lei que define as regras para e-mails comerciais, estabelece requisitos para mensagens comerciais, dá aos destinatários o direito de impedir o envio de e-mails e estabelece penalidades severas para violações.
              </p>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Coletamos seu endereço de e-mail para:
              </h6>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-base md:text-lg">Enviar informações, responder a perguntas e/ou outras solicitações ou dúvidas.</li>
                <li className="text-base md:text-lg">Processar pedidos e enviar informações e atualizações relacionadas aos pedidos.</li>
                <li className="text-base md:text-lg">Também podemos enviar informações adicionais relacionadas ao seu produto e/ou serviço.</li>
                <li className="text-base md:text-lg">Divulgar nossa lista de e-mails ou continuar a enviar e-mails aos nossos clientes após a transação original ter ocorrido.</li>
              </ul>

              <h6 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl">
                Para estar em conformidade com a CANSPAM, concordamos com o seguinte:
              </h6>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
                <li>NÃO usar assuntos ou endereços de e-mail falsos ou enganosos.</li>
                <li>Identificar a mensagem como um anúncio de forma razoável.</li>
                <li>Incluir o endereço físico da nossa empresa ou sede do site.</li>
                <li>Monitorar a conformidade de serviços de marketing por e-mail de terceiros, se forem utilizados.</li>
                <li>Atender rapidamente às solicitações de cancelamento/exclusão.</li>
                <li>Permitir que os usuários cancelem a inscrição usando o link na parte inferior de cada e-mail.</li>
              </ul>
              <p className="text-base md:text-lg">
                Se, a qualquer momento, você desejar cancelar a inscrição para não receber mais e-mails, envie-nos um e-mail ou siga as instruções na parte inferior de cada e-mail e nós o removeremos imediatamente de TODAS as correspondências.
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
                <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a>
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
            Política de
            <br />
            Privacidade
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