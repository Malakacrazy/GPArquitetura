/**
 * ToS (Terms of Service) Component
 *
 * Displays the complete terms of service for GP Arquitetura in a split-screen layout.
 * Covers usage rights, intellectual property, and legal disclaimers.
 *
 * @module components/legal/ToS
 * @since 1.0.0
 *
 * Legal Coverage:
 * - Service usage terms and conditions
 * - Third-party links disclaimer
 * - Intellectual property rights
 * - Governing law (São Paulo, Brazil)
 * - Terms modification policy
 *
 * Features:
 * - Scrollable text content with styled scrollbar
 * - Split-screen layout (text + image)
 * - Responsive design for all screen sizes
 * - Animated content reveal
 *
 * @example
 * ```tsx
 * <ToS />
 * ```
 */
import React from 'react';
import { motion } from 'motion/react';
import { images } from '../../config/assets';
import { contact, company } from '../../config/contact';

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
              <p className="text-sm md:text-base font-semibold text-[var(--color-primary)]">
                Última atualização: Janeiro de 2026
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                1. ACEITAÇÃO DOS TERMOS
              </h2>
              <p className="text-base md:text-lg">
                Bem-vindo ao site da {company.brandName}, com sede em {contact.location.city}, {contact.location.state}, {contact.location.country} (doravante "GP Arquitetura", "nós", "nos" ou "nosso").
              </p>
              <p className="text-base md:text-lg">
                Estes Termos de Uso e Serviço ("Termos") regem o acesso e utilização do site https://www.gparquitetura.com.br e https://gparquitetura.vercel.app (o "Site") e dos serviços oferecidos pela GP Arquitetura (os "Serviços").
              </p>
              <p className="text-base md:text-lg font-semibold">
                Ao acessar ou utilizar o Site, você declara ter lido, compreendido e concordado integralmente com estes Termos. Caso discorde de qualquer disposição, você não está autorizado a acessar ou utilizar o Site.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                2. DEFINIÇÕES
              </h2>
              <p className="text-base md:text-lg">Para fins destes Termos:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Usuário ou Você:</strong> Qualquer pessoa física ou jurídica que acessa ou utiliza o Site.</li>
                <li><strong>Conteúdo:</strong> Todo material disponível no Site, incluindo textos, imagens, fotografias, vídeos, projetos arquitetônicos, renders, plantas, gráficos, logotipos, ícones e outros elementos visuais.</li>
                <li><strong>Serviços:</strong> Atividades de arquitetura e urbanismo oferecidas pela GP Arquitetura, incluindo projetos residenciais, comerciais, interiores e consultoria.</li>
                <li><strong>Conta:</strong> Registro de usuário no Site (se aplicável para área restrita ou portal do cliente).</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                3. IDENTIFICAÇÃO DA EMPRESA
              </h2>
              <p className="text-base md:text-lg">
                <strong>Razão Social:</strong> {company.legalName}<br />
                <strong>Nome Fantasia:</strong> {company.brandName}<br />
                <strong>Endereço:</strong> {contact.location.city}, {contact.location.state}, {contact.location.country}<br />
                <strong>E-mail:</strong> <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a><br />
                <strong>Telefone:</strong> {contact.whatsapp.display}
              </p>
              <p className="text-base md:text-lg">
                <strong>Responsável Técnico:</strong> {company.founder} - Arquiteta e Urbanista
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                4. DESCRIÇÃO DOS SERVIÇOS
              </h2>
              <p className="text-base md:text-lg">
                A GP Arquitetura oferece serviços de arquitetura e urbanismo, incluindo mas não limitado a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Projetos arquitetônicos residenciais e comerciais</li>
                <li>Projetos de interiores</li>
                <li>Consultoria em arquitetura</li>
                <li>Elaboração de plantas e documentação técnica</li>
                <li>Acompanhamento de obras</li>
                <li>Renders e visualizações 3D</li>
              </ul>
              <p className="text-base md:text-lg font-semibold">
                Importante: O Site tem caráter informativo e de divulgação. A contratação de serviços se formaliza mediante proposta comercial específica e contrato escrito.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                5. USO DO SITE
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                5.1. Licença de Uso
              </h3>
              <p className="text-base md:text-lg">
                Concedemos a você uma licença <strong>limitada, não exclusiva, intransferível e revogável</strong> para acessar e usar o Site para fins pessoais e não comerciais.
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                5.2. Proibições
              </h3>
              <p className="text-base md:text-lg">Você concorda em <strong>NÃO</strong>:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Utilizar o Site para fins ilícitos ou não autorizados</li>
                <li>Reproduzir, distribuir, modificar ou criar obras derivadas do Conteúdo sem autorização</li>
                <li>Fazer engenharia reversa, descompilar ou tentar obter o código-fonte do Site</li>
                <li>Utilizar bots, scrapers ou sistemas automatizados para acessar o Site</li>
                <li>Transmitir vírus, malware ou qualquer código prejudicial</li>
                <li>Interferir ou interromper o funcionamento do Site</li>
                <li>Violar direitos de propriedade intelectual da GP Arquitetura ou de terceiros</li>
                <li>Coletar informações de outros usuários sem consentimento</li>
                <li>Fazer uso comercial do Conteúdo sem autorização expressa e por escrito</li>
                <li>Publicar o Conteúdo em outros sites, redes sociais ou plataformas sem permissão</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                5.3. Consequências de Violação
              </h3>
              <p className="text-base md:text-lg">A violação de qualquer disposição destes Termos resultará em:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Suspensão ou encerramento imediato do acesso ao Site</li>
                <li>Obrigação de destruir todas as cópias do Conteúdo em sua posse</li>
                <li>Responsabilização civil e criminal pelos danos causados</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                6. PROPRIEDADE INTELECTUAL
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                6.1. Direitos Autorais
              </h3>
              <p className="text-base md:text-lg">
                Todo o Conteúdo disponível no Site é protegido por <strong>direitos autorais</strong> conforme a <strong>Lei nº 9.610/1998 (Lei de Direitos Autorais)</strong> e legislação aplicável.
              </p>
              <p className="text-base md:text-lg"><strong>Titularidade:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Os projetos arquitetônicos, renders, fotografias e textos originais são de propriedade exclusiva da GP Arquitetura</li>
                <li>Algumas imagens podem pertencer a terceiros (fotógrafos, fornecedores) devidamente creditados</li>
                <li>O uso não autorizado pode violar direitos autorais e outras leis de propriedade intelectual</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                6.2. Marcas Registradas
              </h3>
              <p className="text-base md:text-lg">
                Os seguintes elementos são marcas da GP Arquitetura, protegidas pela <strong>Lei nº 9.279/1996 (Lei da Propriedade Industrial)</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Nome "GP Arquitetura"</li>
                <li>Logotipo e identidade visual</li>
                <li>Outros sinais distintivos exibidos no Site</li>
              </ul>
              <p className="text-base md:text-lg"><strong>Proibições:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Utilizar nossas marcas sem autorização prévia por escrito</li>
                <li>Criar links para o Site sem aprovação (exceto links simples e não-comerciais)</li>
                <li>Utilizar marcas de forma que sugira associação, patrocínio ou aprovação não existente</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                6.3. Uso Autorizado do Conteúdo
              </h3>
              <p className="text-base md:text-lg"><strong>Você PODE:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Visualizar o Conteúdo disponível publicamente no Site para uso pessoal e não comercial</li>
                <li>Compartilhar links diretos para o Site em redes sociais (com crédito adequado)</li>
                <li>Salvar imagens de referência para inspiração pessoal (não profissional)</li>
              </ul>
              <p className="text-base md:text-lg"><strong>Você NÃO PODE:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Reproduzir, publicar ou distribuir o Conteúdo comercialmente</li>
                <li>Utilizar projetos, plantas ou renders em apresentações profissionais sem autorização</li>
                <li>Remover avisos de copyright ou marcas d'água</li>
                <li>Reivindicar autoria do Conteúdo</li>
                <li>Vender, licenciar ou sublicenciar o Conteúdo</li>
                <li>Utilizar o Conteúdo em outros sites, blogs ou portfólios</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                6.4. Solicitação de Autorização
              </h3>
              <p className="text-base md:text-lg">
                Para uso comercial, profissional ou de maior alcance do Conteúdo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Entre em contato: <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a></li>
                <li>Especifique: tipo de uso, meio de divulgação, prazo</li>
                <li>Aguarde autorização expressa por escrito</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                6.5. Direitos de Terceiros
              </h3>
              <p className="text-base md:text-lg">
                Respeitamos os direitos de propriedade intelectual de terceiros. Se você acredita que algum Conteúdo no Site viola seus direitos:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Envie notificação para: <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a></li>
                <li>Inclua: identificação do material, localização no Site, seus dados de contato e declaração de boa-fé</li>
                <li>Analisaremos e tomaremos providências conforme a legislação</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                7. PRIVACIDADE E PROTEÇÃO DE DADOS
              </h2>
              <p className="text-base md:text-lg">
                A coleta, uso e proteção de seus dados pessoais são regidos por nossa <strong>Política de Privacidade</strong>, elaborada em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>.
              </p>
              <p className="text-base md:text-lg">
                Ao utilizar o Site, você também concorda com nossa Política de Privacidade, disponível em: <a href="/privacy-policy" className="text-[var(--color-primary)] underline">/privacy-policy</a>
              </p>
              <p className="text-base md:text-lg"><strong>Principais pontos:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Coletamos apenas dados necessários para prestação de serviços</li>
                <li>Respeitamos seus direitos como titular de dados</li>
                <li>Implementamos medidas de segurança adequadas</li>
                <li>Não comercializamos seus dados pessoais</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                8. CONTEÚDO DO USUÁRIO
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                8.1. Envio de Conteúdo
              </h3>
              <p className="text-base md:text-lg">
                Ao enviar comentários, mensagens, imagens ou qualquer outro conteúdo através do Site (ex: formulário de contato):
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Você declara ser titular dos direitos sobre o conteúdo enviado</li>
                <li>Você nos concede licença mundial, não exclusiva, gratuita e perpétua para utilizar, reproduzir e exibir o conteúdo para fins relacionados aos Serviços</li>
                <li>Você garante que o conteúdo não viola direitos de terceiros</li>
                <li>Você isenta a GP Arquitetura de qualquer reclamação relacionada ao conteúdo enviado</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                8.2. Moderação
              </h3>
              <p className="text-base md:text-lg">Reservamo-nos o direito de:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Revisar, editar ou remover qualquer conteúdo enviado</li>
                <li>Recusar publicação de conteúdo inadequado, ofensivo ou ilegal</li>
                <li>Excluir conteúdo que viole estes Termos</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                9. LINKS PARA SITES DE TERCEIROS
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                9.1. Links Externos
              </h3>
              <p className="text-base md:text-lg">
                O Site pode conter links para sites de terceiros (fornecedores, parceiros, redes sociais, etc.).
              </p>
              <p className="text-base md:text-lg"><strong>Isenção de responsabilidade:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Não controlamos nem nos responsabilizamos pelo conteúdo de sites externos</li>
                <li>Links não implicam em aprovação, patrocínio ou associação</li>
                <li>Recomendamos que você leia os termos e políticas dos sites de terceiros</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                9.2. Links para Nosso Site
              </h3>
              <p className="text-base md:text-lg">Você pode criar links simples para nossa página inicial desde que:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Não sugira associação, aprovação ou patrocínio não existente</li>
                <li>Não utilize framing, mirrors ou técnicas similares</li>
                <li>O link não seja inserido em contextos ofensivos, ilegais ou prejudiciais à nossa reputação</li>
              </ul>
              <p className="text-base md:text-lg">
                Para outros tipos de link (ex: deep links, uso de logotipo), solicite autorização: <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a>
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                10. ISENÇÃO DE GARANTIAS
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                10.1. Uso "No Estado"
              </h3>
              <p className="text-base md:text-lg">
                O Site e os Serviços são fornecidos "no estado" e "conforme disponíveis", sem garantias de qualquer tipo.
              </p>
              <p className="text-base md:text-lg"><strong>Não garantimos:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Disponibilidade ininterrupta ou livre de erros do Site</li>
                <li>Exatidão, completude ou atualidade das informações</li>
                <li>Resultados específicos do uso do Site</li>
                <li>Compatibilidade com todos os dispositivos ou navegadores</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                10.2. Conteúdo Informativo
              </h3>
              <p className="text-base md:text-lg">
                As informações no Site têm caráter informativo geral. Para orientações específicas sobre projetos, serviços ou questões técnicas, solicite consultoria profissional formalizada.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                11. LIMITAÇÃO DE RESPONSABILIDADE
              </h2>
              <p className="text-base md:text-lg">Na máxima extensão permitida pela lei brasileira:</p>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                11.1. Exclusão de Danos
              </h3>
              <p className="text-base md:text-lg">A GP Arquitetura não será responsável por:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Danos diretos, indiretos, incidentais, consequenciais ou punitivos</li>
                <li>Perda de lucros, dados, oportunidades de negócio ou reputação</li>
                <li>Interrupção de negócios ou uso do Site</li>
                <li>Erros, vírus ou problemas técnicos</li>
                <li>Ações de terceiros ou conteúdo de sites externos</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                11.2. Valor Máximo
              </h3>
              <p className="text-base md:text-lg">
                Em qualquer caso, nossa responsabilidade total não excederá o valor pago por você pelos Serviços (se aplicável) nos 12 meses anteriores ao evento que deu origem à reclamação.
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                11.3. Legislação Imperativa
              </h3>
              <p className="text-base md:text-lg">
                Esta limitação não se aplica a responsabilidades que não possam ser excluídas ou limitadas pela legislação brasileira, como danos causados por dolo ou culpa grave.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                12. INDENIZAÇÃO
              </h2>
              <p className="text-base md:text-lg">
                Você concorda em indenizar, defender e isentar a GP Arquitetura, seus sócios, colaboradores e prestadores de serviços de todas as reclamações, perdas, responsabilidades, danos, custos e despesas (incluindo honorários advocatícios) decorrentes de:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Sua violação destes Termos</li>
                <li>Seu uso inadequado do Site ou Serviços</li>
                <li>Violação de direitos de terceiros</li>
                <li>Qualquer conteúdo que você enviar através do Site</li>
                <li>Violação de leis ou regulamentos aplicáveis</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                13. MODIFICAÇÕES
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                13.1. Alterações nos Termos
              </h3>
              <p className="text-base md:text-lg">
                Reservamo-nos o direito de modificar estes Termos a qualquer momento, a nosso exclusivo critério.
              </p>
              <p className="text-base md:text-lg"><strong>Notificação:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Data de "Última atualização" será modificada</li>
                <li>Para alterações significativas: aviso no Site com 30 dias de antecedência</li>
                <li>Alterações materiais entram em vigor após o prazo de aviso</li>
              </ul>
              <p className="text-base md:text-lg"><strong>Aceitação:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Continuar usando o Site após as alterações constitui aceitação dos novos Termos</li>
                <li>Se discordar das alterações, descontinue o uso do Site</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                13.2. Alterações no Site
              </h3>
              <p className="text-base md:text-lg">
                Podemos modificar, suspender ou descontinuar qualquer aspecto do Site, temporária ou permanentemente, sem aviso prévio.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                14. RESCISÃO
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                14.1. Por Parte do Usuário
              </h3>
              <p className="text-base md:text-lg">
                Você pode cessar o uso do Site a qualquer momento.
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                14.2. Por Parte da GP Arquitetura
              </h3>
              <p className="text-base md:text-lg">Podemos suspender ou encerrar seu acesso ao Site imediatamente, sem aviso prévio, se:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Você violar estes Termos</li>
                <li>Houver suspeita de atividade fraudulenta ou ilegal</li>
                <li>For necessário por motivos legais ou regulatórios</li>
                <li>A nosso exclusivo critério, para proteção de nossos interesses</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                14.3. Efeitos da Rescisão
              </h3>
              <p className="text-base md:text-lg">Após a rescisão:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Seu direito de acessar o Site cessa imediatamente</li>
                <li>Disposições que por sua natureza devem sobreviver (propriedade intelectual, limitação de responsabilidade, etc.) permanecerão em vigor</li>
                <li>Você deve destruir todas as cópias do Conteúdo em sua posse</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                15. DISPOSIÇÕES GERAIS
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                15.1. Acordo Integral
              </h3>
              <p className="text-base md:text-lg">
                Estes Termos, juntamente com a Política de Privacidade, constituem o acordo integral entre você e a GP Arquitetura sobre o uso do Site, substituindo todos os acordos anteriores.
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                15.2. Renúncia
              </h3>
              <p className="text-base md:text-lg">
                Nossa falha em exercer ou fazer cumprir qualquer direito previsto nestes Termos não constitui renúncia a tal direito.
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                15.3. Independência das Cláusulas
              </h3>
              <p className="text-base md:text-lg">
                Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                15.4. Cessão
              </h3>
              <p className="text-base md:text-lg">
                Você não pode ceder ou transferir seus direitos sob estes Termos sem nosso consentimento prévio por escrito. Podemos ceder nossos direitos a qualquer afiliada ou sucessora.
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                15.5. Força Maior
              </h3>
              <p className="text-base md:text-lg">
                Não seremos responsáveis por atrasos ou falhas no cumprimento de obrigações devido a causas fora de nosso controle razoável (desastres naturais, guerras, pandemias, falhas de infraestrutura de internet, etc.).
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                16. LEI APLICÁVEL E JURISDIÇÃO
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                16.1. Lei Aplicável
              </h3>
              <p className="text-base md:text-lg">
                Estes Termos são regidos e interpretados de acordo com as leis da <strong>República Federativa do Brasil</strong>, especialmente:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Lei nº 10.406/2002 (Código Civil)</li>
                <li>Lei nº 8.078/1990 (Código de Defesa do Consumidor)</li>
                <li>Lei nº 9.610/1998 (Direitos Autorais)</li>
                <li>Lei nº 9.279/1996 (Propriedade Industrial)</li>
                <li>Lei nº 13.709/2018 (LGPD)</li>
                <li>Lei nº 12.965/2014 (Marco Civil da Internet)</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                16.2. Foro
              </h3>
              <p className="text-base md:text-lg">
                Fica eleito o foro da Comarca de {contact.location.city}/{contact.location.state} para dirimir quaisquer controvérsias oriundas destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
              </p>
              <p className="text-base md:text-lg">
                <strong>Exceção:</strong> Consumidores podem optar pelo foro de seu domicílio, conforme Art. 101, I do Código de Defesa do Consumidor.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                17. RESOLUÇÃO DE CONFLITOS
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                17.1. Negociação Direta
              </h3>
              <p className="text-base md:text-lg">
                Antes de iniciar qualquer procedimento legal, as partes se comprometem a tentar resolver disputas por meio de negociação direta de boa-fé.
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                17.2. Mediação (Opcional)
              </h3>
              <p className="text-base md:text-lg">
                As partes podem, de comum acordo, submeter a disputa a mediação antes de recorrer ao judiciário.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                18. CONTATO
              </h2>
              <p className="text-base md:text-lg">
                Para questões, dúvidas ou solicitações relacionadas a estes Termos:
              </p>
              <p className="text-base md:text-lg">
                <strong>E-mail:</strong> <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a><br />
                <strong>Telefone:</strong> {contact.whatsapp.display}<br />
                <strong>Endereço:</strong> {contact.location.city}, {contact.location.state}, {contact.location.country}<br />
                <strong>Horário de atendimento:</strong> Segunda a Sexta, {contact.businessHours.openHour}h às {contact.businessHours.closeHour}h ({contact.location.timezone})
              </p>
              <p className="text-base md:text-lg">
                <strong>Para questões sobre privacidade e dados pessoais:</strong><br />
                privacidade@gparquitetura.com.br
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                19. IDIOMA
              </h2>
              <p className="text-base md:text-lg">
                Estes Termos são redigidos em língua portuguesa (Brasil). Qualquer tradução é fornecida apenas para conveniência. Em caso de conflito, a versão em português prevalecerá.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                20. RECONHECIMENTO
              </h2>
              <p className="text-base md:text-lg">Ao utilizar o Site, você reconhece que:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Leu e compreendeu integralmente estes Termos</li>
                <li>Concorda em se comprometer com todas as disposições</li>
                <li>Tem capacidade legal para aceitar estes Termos</li>
                <li>Entende as limitações e exclusões de responsabilidade</li>
              </ul>

              <p className="text-sm md:text-base font-semibold text-[var(--color-primary)] pt-6">
                Última atualização: Janeiro de 2026<br />
                Versão: 1.0
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