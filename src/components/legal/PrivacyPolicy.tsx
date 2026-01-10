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
import { contact, company } from '../../config/contact';

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
              <p className="text-sm md:text-base font-semibold text-[var(--color-primary)]">
                Última atualização: Janeiro de 2026<br />
                Versão: 2.0 - Documento Consolidado
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                1. INTRODUÇÃO
              </h2>
              <p className="text-base md:text-lg">
                A <strong>{company.legalName}</strong>, com sede em <strong>{contact.location.city}, {contact.location.state}, {contact.location.country}</strong> (doravante "GP Arquitetura", "nós" ou "nosso"), está comprometida com a proteção da privacidade e dos dados pessoais de seus clientes, visitantes do site e demais interessados em todas as jurisdições onde atuamos.
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                1.1. Legislação Aplicável
              </h3>
              <p className="text-base md:text-lg">Esta Política de Privacidade foi elaborada em conformidade com:</p>
              <p className="text-base md:text-lg"><strong>🇧🇷 Base Primária (Brasil):</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Lei Geral de Proteção de Dados Pessoais - LGPD (Lei nº 13.709/2018)</li>
                <li>Marco Civil da Internet (Lei nº 12.965/2014)</li>
              </ul>
              <p className="text-base md:text-lg"><strong>🇪🇺 Conformidade Regional (União Europeia):</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>General Data Protection Regulation - GDPR (Regulamento UE 2016/679)</li>
                <li>UK GDPR (Reino Unido pós-Brexit)</li>
              </ul>
              <p className="text-base md:text-lg"><strong>🇺🇸 Conformidade Regional (Estados Unidos):</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>California Consumer Privacy Act - CCPA (California Civil Code §1798.100+)</li>
                <li>California Privacy Rights Act - CPRA (2023+)</li>
              </ul>
              <p className="text-base md:text-lg"><strong>🌍 Outras Jurisdições:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>PIPEDA (Canadá), Privacy Act 1988 (Austrália) e leis locais aplicáveis</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                1.2. A Quem Esta Política se Aplica
              </h3>
              <p className="text-base md:text-lg">Esta política aplica-se a:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Visitantes do site (em qualquer localização)</li>
                <li>Clientes e potenciais clientes (Brasil e internacional)</li>
                <li>Parceiros comerciais e fornecedores</li>
                <li>Qualquer pessoa cujos dados pessoais sejam tratados pela GP Arquitetura</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                1.3. Hierarquia de Aplicação
              </h3>
              <p className="text-base md:text-lg">
                <strong>Operamos primariamente no Brasil</strong> e estamos sujeitos à LGPD como legislação base. Quando você está localizado ou é residente de outras jurisdições, as seguintes leis também se aplicam conforme sua localização.
              </p>
              <p className="text-base md:text-lg font-semibold">
                Importante: Quando múltiplas leis se aplicam simultaneamente, aplicamos a <strong>mais protetiva</strong> ao titular de dados.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                2. GLOSSÁRIO DE TERMOS
              </h2>
              <p className="text-base md:text-lg">Para facilitar a compreensão desta política, definimos alguns termos técnicos:</p>
              <p className="text-base md:text-lg"><strong>Termos Gerais:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Titular de dados:</strong> Você, pessoa natural a quem se referem os dados pessoais.</li>
                <li><strong>Dados pessoais:</strong> Informações relacionadas a pessoa natural identificada ou identificável.</li>
                <li><strong>Tratamento:</strong> Qualquer operação com dados (coleta, armazenamento, uso, compartilhamento, eliminação).</li>
                <li><strong>Controlador:</strong> GP Arquitetura, que toma decisões sobre tratamento de dados.</li>
                <li><strong>Operador/Processador:</strong> Terceiros que tratam dados em nosso nome.</li>
                <li><strong>ANPD:</strong> Autoridade Nacional de Proteção de Dados (Brasil).</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                3. IDENTIFICAÇÃO DO CONTROLADOR
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
                4. ENCARREGADO DE PROTEÇÃO DE DADOS (DPO)
              </h2>
              <p className="text-base md:text-lg">
                Conforme Art. 41 da LGPD e Art. 37 do GDPR (quando aplicável), designamos um Encarregado de Dados:
              </p>
              <p className="text-base md:text-lg">
                <strong>E-mail para privacidade:</strong> <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a><br />
                <strong>Idiomas de atendimento:</strong> Português, Inglês, Espanhol
              </p>
              <p className="text-base md:text-lg">
                <strong>Função:</strong> Receber comunicações de titulares e autoridades, prestar esclarecimentos e adotar providências relacionadas à proteção de dados.
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                5. DADOS PESSOAIS COLETADOS
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                5.1. Dados Fornecidos Voluntariamente
              </h3>
              <p className="text-base md:text-lg">Coletamos dados quando você preenche formulários em nosso site ou entra em contato conosco:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Identificação:</strong> Nome completo</li>
                <li><strong>Contato:</strong> E-mail, telefone</li>
                <li><strong>Localização:</strong> País, cidade, endereço</li>
                <li><strong>Mensagem:</strong> Conteúdo do formulário</li>
                <li><strong>Projeto:</strong> Detalhes sobre projeto desejado</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                5.2. Dados Coletados Automaticamente
              </h3>
              <p className="text-base md:text-lg">Quando você visita nosso site, coletamos automaticamente:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Navegação:</strong> Páginas visitadas, tempo no site</li>
                <li><strong>Técnicos:</strong> Endereço IP, tipo de navegador, dispositivo</li>
                <li><strong>Cookies:</strong> Identificadores únicos</li>
                <li><strong>Geolocalização:</strong> País/cidade (aproximado)</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                5.3. Dados que NÃO Coletamos
              </h3>
              <p className="text-base md:text-lg"><strong>Não coletamos intencionalmente:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Dados sensíveis (origem racial, convicções religiosas, saúde, biometria)</li>
                <li>Dados de crianças e adolescentes menores de 18 anos sem consentimento parental</li>
                <li>Informações financeiras completas (apenas para pagamentos via processadores)</li>
                <li>Histórico de navegação em outros sites</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                6. FINALIDADES DO TRATAMENTO
              </h2>
              <p className="text-base md:text-lg">Utilizamos seus dados pessoais para:</p>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                6.1. Atendimento e Comunicação
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Responder a perguntas e solicitações</li>
                <li>Fornecer informações sobre nossos serviços</li>
                <li>Manter contato durante desenvolvimento de projetos</li>
                <li>Enviar atualizações sobre projetos em andamento</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                6.2. Execução de Contratos
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Elaborar propostas comerciais</li>
                <li>Desenvolver projetos arquitetônicos</li>
                <li>Gerenciar documentação técnica</li>
                <li>Acompanhar execução de obras</li>
                <li>Emitir documentos fiscais</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                6.3. Melhorias no Site e Serviços
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Analisar comportamento de navegação</li>
                <li>Identificar problemas técnicos</li>
                <li>Aprimorar conteúdo e funcionalidades</li>
                <li>Entender preferências dos visitantes</li>
                <li>Otimizar experiência do usuário</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                6.4. Marketing (com consentimento)
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Enviar newsletter sobre projetos e novidades</li>
                <li>Compartilhar conteúdo relevante sobre arquitetura</li>
                <li>Divulgar novos serviços</li>
                <li>Promoções e eventos (quando aplicável)</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                7. BASES LEGAIS PARA TRATAMENTO
              </h2>
              <p className="text-base md:text-lg">Todo tratamento de dados tem uma base legal conforme legislação aplicável:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Consentimento:</strong> Newsletter, cookies analytics/marketing</li>
                <li><strong>Execução de contrato:</strong> Projetos, propostas, documentação</li>
                <li><strong>Legítimo interesse:</strong> Segurança, cookies necessários, analytics básico</li>
                <li><strong>Obrigação legal:</strong> Documentos fiscais, registros CAU</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                7.1. Como Revogar Consentimento
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>E-mail: <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a></li>
                <li>Link "descadastrar" em e-mails</li>
                <li>Configurações do banner de cookies</li>
              </ul>
              <p className="text-base md:text-lg"><strong>Efeito:</strong> Revogação não afeta tratamento anterior baseado em consentimento válido.</p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                8. COMPARTILHAMENTO DE DADOS
              </h2>
              <p className="text-base md:text-lg font-semibold">❌ NÃO vendemos, alugamos ou comercializamos seus dados pessoais.</p>
              <p className="text-base md:text-lg">Seus dados podem ser compartilhados com:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Fornecedores de tecnologia:</strong> Vercel (hospedagem), Google (analytics)</li>
                <li><strong>Prestadores de serviços:</strong> Contabilidade, jurídico</li>
                <li><strong>Parceiros comerciais:</strong> Fornecedores, construtoras</li>
                <li><strong>Autoridades públicas:</strong> Conforme obrigação legal</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                9. TRANSFERÊNCIAS INTERNACIONAIS DE DADOS
              </h2>
              <p className="text-base md:text-lg">Alguns dados podem ser transferidos para outros países:</p>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                9.1. Google Analytics (Estados Unidos)
              </h3>
              <p className="text-base md:text-lg"><strong>Dados transferidos:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Endereço IP (anonimizado)</li>
                <li>Páginas visitadas</li>
                <li>Tipo de dispositivo e navegador</li>
              </ul>
              <p className="text-base md:text-lg"><strong>Salvaguardas:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Google SCCs (Standard Contractual Clauses)</li>
                <li>EU-US Data Privacy Framework</li>
                <li>Anonimização de endereços IP</li>
                <li>Você pode optar por não usar (rejeitar cookies analytics)</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                9.2. Vercel - Hospedagem (Estados Unidos)
              </h3>
              <p className="text-base md:text-lg"><strong>Dados transferidos:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Dados técnicos de acesso (IP, User-Agent, horário)</li>
                <li>Conteúdo de formulários submetidos</li>
              </ul>
              <p className="text-base md:text-lg"><strong>Salvaguardas:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Vercel DPA com cláusulas de proteção</li>
                <li>Criptografia em trânsito (TLS) e em repouso</li>
                <li>Infraestrutura certificada (SOC 2)</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                10. SEGURANÇA DOS DADOS
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                10.1. Medidas Técnicas
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Criptografia TLS/SSL (HTTPS) para transmissão de dados</li>
                <li>Firewall e proteção DDoS</li>
                <li>Certificados SSL atualizados regularmente</li>
                <li>Backups regulares (diários)</li>
                <li>Controle de acesso restrito</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                10.2. Resposta a Incidentes
              </h3>
              <p className="text-base md:text-lg">Em caso de incidente de segurança:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>LGPD: ANPD em prazo razoável se risco relevante</li>
                <li>GDPR: Autoridade supervisora em 72h se alto risco</li>
                <li>Notificaremos você sobre o ocorrido e medidas tomadas</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                11. RETENÇÃO DE DADOS
              </h2>
              <p className="text-base md:text-lg">Mantemos seus dados apenas pelo tempo necessário:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Formulário de contato:</strong> 1 ano após último contato</li>
                <li><strong>Propostas não aceitas:</strong> 2 anos</li>
                <li><strong>Contratos e projetos:</strong> 5 anos após conclusão</li>
                <li><strong>Documentos fiscais:</strong> 5 anos</li>
                <li><strong>Cookies de analytics:</strong> 24 meses</li>
                <li><strong>Newsletter:</strong> Até cancelamento</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                12. DIREITOS DOS TITULARES DE DADOS
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                12.1. Direitos Garantidos pela LGPD (Brasil)
              </h3>
              <p className="text-base md:text-lg">Conforme Art. 18 da LGPD, você tem direito a:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Confirmação de tratamento:</strong> Saber se tratamos seus dados pessoais</li>
                <li><strong>Acesso:</strong> Obter cópia dos seus dados</li>
                <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li><strong>Anonimização, bloqueio ou eliminação:</strong> Para dados desnecessários ou excessivos</li>
                <li><strong>Portabilidade:</strong> Receber dados em formato estruturado</li>
                <li><strong>Eliminação:</strong> Excluir dados tratados com consentimento</li>
                <li><strong>Informação sobre compartilhamento:</strong> Saber com quem compartilhamos</li>
                <li><strong>Revogação do consentimento:</strong> Retirar autorização</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                12.2. Direitos para Residentes da União Europeia (GDPR)
              </h3>
              <p className="text-base md:text-lg">Se você é residente da UE, EEE ou Reino Unido, tem direitos adicionais:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Direito ao Esquecimento:</strong> Solicitar eliminação em situações específicas</li>
                <li><strong>Restrição de Tratamento:</strong> Limitar como usamos seus dados</li>
                <li><strong>Oposição:</strong> Opor-se a tratamento baseado em legítimo interesse</li>
                <li><strong>Portabilidade:</strong> Transmitir dados diretamente a outro controlador</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                12.3. Direitos para Residentes da Califórnia (CCPA/CPRA)
              </h3>
              <p className="text-base md:text-lg">Se você é residente da Califórnia:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li><strong>Direito de Saber:</strong> Categorias de informações coletadas e compartilhadas</li>
                <li><strong>Direito de Acesso:</strong> Solicitar cópia específica das informações</li>
                <li><strong>Direito de Eliminação:</strong> Solicitar exclusão (sujeito a exceções)</li>
                <li><strong>Direito de Correção:</strong> Corrigir informações inexatas</li>
                <li><strong>Não-Discriminação:</strong> Não será discriminado por exercer direitos</li>
              </ul>
              <p className="text-base md:text-lg font-semibold">
                ❌ NÃO vendemos suas informações pessoais conforme definição CCPA
              </p>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                12.4. Como Exercer Seus Direitos
              </h3>
              <p className="text-base md:text-lg"><strong>Contato:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>E-mail: <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a></li>
                <li>Idiomas: Português, Inglês, Espanhol</li>
              </ul>
              <p className="text-base md:text-lg"><strong>Prazos de Resposta:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Brasil (LGPD): 15 dias (meta: 10 dias)</li>
                <li>UE (GDPR): 30 dias (prorrogável +60)</li>
                <li>Califórnia (CCPA): 45 dias (prorrogável +45)</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                13. COOKIES E TECNOLOGIAS SIMILARES
              </h2>
              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                13.1. Cookies Estritamente Necessários
              </h3>
              <p className="text-base md:text-lg">Sempre ativos - essenciais para funcionamento:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>cookie_consent: Armazena preferências de cookies (12 meses)</li>
                <li>session_id: Mantém sessão de navegação (sessão)</li>
                <li>csrf_token: Proteção contra ataques (sessão)</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                13.2. Cookies de Analytics
              </h3>
              <p className="text-base md:text-lg">Requerem consentimento:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>_ga, _ga_*, _gid: Google Analytics (24 meses)</li>
                <li>Dados: Páginas visitadas, duração, dispositivo, origem do tráfego</li>
                <li>Transferência: Dados enviados para Google LLC (EUA)</li>
                <li>Podem ser desativados através do banner de cookies</li>
              </ul>

              <h3 className="text-[var(--color-primary)] pt-4 text-xl md:text-2xl font-semibold">
                13.3. Como Gerenciar Cookies
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Banner de cookies na primeira visita</li>
                <li>Clique no ícone 🍪 no rodapé para reabrir preferências</li>
                <li>Configure através das configurações do navegador</li>
                <li>Use complemento do Google: <a href="https://tools.google.com/dlpage/gaoptout" className="text-[var(--color-primary)] underline">Google Analytics Opt-out</a></li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                14. NEWSLETTER E COMUNICAÇÕES POR E-MAIL
              </h2>
              <p className="text-base md:text-lg"><strong>Quando você se cadastra:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Base legal: Consentimento</li>
                <li>Dados coletados: Nome e e-mail</li>
                <li>Frequência: Quinzenal ou conforme relevância</li>
                <li>Double opt-in (confirmação por e-mail)</li>
              </ul>
              <p className="text-base md:text-lg"><strong>Como cancelar:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Clique em "Descadastrar" no rodapé de qualquer e-mail</li>
                <li>Envie e-mail para: <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a></li>
                <li>Processamento: máximo 48h</li>
              </ul>
              <p className="text-base md:text-lg font-semibold">
                ❌ NÃO vendemos listas de e-mail
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                15. PROTEÇÃO DE CRIANÇAS E ADOLESCENTES
              </h2>
              <p className="text-base md:text-lg">
                <strong>Não coletamos intencionalmente dados de menores de 18 anos</strong> sem consentimento dos pais ou responsáveis legais.
              </p>
              <p className="text-base md:text-lg"><strong>Se você tem menos de 18 anos:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Peça autorização dos seus pais antes de usar o site</li>
                <li>Não forneça dados pessoais sem permissão</li>
                <li>Não se cadastre em nossa newsletter</li>
              </ul>
              <p className="text-base md:text-lg"><strong>Se identificarmos coleta inadvertida:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Suspendemos tratamento imediatamente</li>
                <li>Excluímos os dados dentro de 48 horas</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                16. ALTERAÇÕES NESTA POLÍTICA
              </h2>
              <p className="text-base md:text-lg">Podemos atualizar esta Política periodicamente.</p>
              <p className="text-base md:text-lg"><strong>Alterações materiais:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>E-mail para todos os titulares cadastrados</li>
                <li>Aviso destacado no site por 30 dias</li>
                <li>Publicação com 30 dias de antecedência</li>
                <li>Você pode discordar e solicitar eliminação de dados</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                17. LEI APLICÁVEL E JURISDIÇÃO
              </h2>
              <p className="text-base md:text-lg">Esta Política é regida pela legislação brasileira:</p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Lei nº 13.709/2018 (LGPD)</li>
                <li>Lei nº 12.965/2014 (Marco Civil da Internet)</li>
                <li>Lei nº 8.078/1990 (Código de Defesa do Consumidor)</li>
              </ul>
              <p className="text-base md:text-lg">
                <strong>Foro:</strong> Comarca de {contact.location.city}/{contact.location.state}<br />
                <strong>Exceção:</strong> Consumidores podem optar pelo foro de seu domicílio (CDC Art. 101, I)
              </p>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                18. AUTORIDADES DE PROTEÇÃO DE DADOS
              </h2>
              <p className="text-base md:text-lg"><strong>🇧🇷 Brasil - ANPD</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Website: <a href="https://www.gov.br/anpd" className="text-[var(--color-primary)] underline">https://www.gov.br/anpd</a></li>
                <li>Como reclamar: Formulário online no site da ANPD</li>
              </ul>
              <p className="text-base md:text-lg"><strong>🇪🇺 União Europeia</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Lista de autoridades: <a href="https://edpb.europa.eu/about-edpb/board/members_en" className="text-[var(--color-primary)] underline">https://edpb.europa.eu/about-edpb/board/members_en</a></li>
              </ul>
              <p className="text-base md:text-lg"><strong>🇬🇧 Reino Unido - ICO</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Website: <a href="https://ico.org.uk" className="text-[var(--color-primary)] underline">https://ico.org.uk</a></li>
                <li>Tel: +44 303 123 1113</li>
              </ul>
              <p className="text-base md:text-lg"><strong>🇺🇸 Califórnia - CPPA</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Website: <a href="https://cppa.ca.gov" className="text-[var(--color-primary)] underline">https://cppa.ca.gov</a></li>
                <li>Tel: +1 (916) 263-7005</li>
              </ul>

              <h2 className="text-[var(--color-primary)] pt-6 text-2xl md:text-3xl font-bold">
                19. CONTATO E ATENDIMENTO
              </h2>
              <p className="text-base md:text-lg"><strong>Para questões sobre privacidade e proteção de dados:</strong></p>
              <p className="text-base md:text-lg">
                📧 <strong>E-mail:</strong> <a href={contact.email.url} className="text-[var(--color-primary)] underline">{contact.email.address}</a><br />
                📞 <strong>Telefone:</strong> {contact.whatsapp.display} / +{contact.whatsapp.number}<br />
                <strong>Idiomas:</strong> Português, Inglês, Espanhol<br />
                <strong>Horário:</strong> Segunda a Sexta, {contact.businessHours.openHour}h às {contact.businessHours.closeHour}h ({contact.location.timezone})<br />
                <strong>Prazo de resposta inicial:</strong> 24-48 horas (dias úteis)
              </p>
              <p className="text-base md:text-lg"><strong>Assuntos específicos - use o subject:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>"LGPD Privacy Request" (Brasil)</li>
                <li>"GDPR Data Subject Request" (União Europeia)</li>
                <li>"CCPA Privacy Request - California Resident" (Califórnia)</li>
                <li>"Privacy Inquiry" (geral)</li>
              </ul>

              <p className="text-sm md:text-base font-semibold text-[var(--color-primary)] pt-6">
                Última atualização: Janeiro de 2026<br />
                Versão: 2.0 - Documento Consolidado
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