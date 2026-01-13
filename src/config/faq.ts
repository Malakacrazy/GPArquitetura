/**
 * FAQ Configuration
 *
 * Contains all FAQ categories and questions for the 3D visualization services.
 *
 * @module config/faq
 * @since 1.0.1
 */

/** FAQ item structure */
export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

/** FAQ categories for filtering */
export const categories = [
  "PERGUNTAS GERAIS",
  "IMAGENS EXTERNAS E INTERNAS",
  "ANIMAÇÕES",
  "TOUR VIRTUAL",
  "PRODUTOS"
] as const;

/** All FAQ items organized by category */
export const faqs: FAQItem[] = [
  // COMMON QUESTIONS
  {
    category: "PERGUNTAS GERAIS",
    question: "O que é a visualização arquitetônica em 3D?",
    answer: "A visualização arquitetônica em 3D é uma representação realista do projeto antes da execução, permitindo compreender volumes, materiais, iluminação e atmosfera do espaço. Ela facilita decisões, aprovações e apresentações, tornando o projeto mais claro e assertivo."
  },
  {
    category: "PERGUNTAS GERAIS",
    question: "Os renders são fiéis ao projeto executivo?",
    answer: "Sim. Trabalhamos a partir do projeto fornecido pelo cliente, respeitando medidas, proporções e especificações técnicas. Nosso objetivo é traduzir o projeto com precisão, mantendo fidelidade técnica aliada à qualidade estética."
  },
  {
    category: "PERGUNTAS GERAIS",
    question: "O que preciso enviar para iniciar um projeto?",
    answer: "Geralmente solicitamos plantas, cortes, elevações, referências visuais e, quando disponíveis, definições de materiais. Caso o projeto ainda não esteja totalmente definido, auxiliamos na interpretação e organização das informações necessárias."
  },
  {
    category: "PERGUNTAS GERAIS",
    question: "Vocês desenvolvem a modelagem do projeto?",
    answer: "Sim. A modelagem 3D é desenvolvida a partir dos arquivos e informações fornecidas. Não é necessário que o cliente entregue o modelo pronto."
  },
  {
    category: "PERGUNTAS GERAIS",
    question: "Posso enviar referências visuais?",
    answer: "Sim, e elas são muito bem-vindas. Referências ajudam a alinhar estilo, atmosfera, iluminação e expectativas de resultado."
  },
  {
    category: "PERGUNTAS GERAIS",
    question: "Quantas revisões estão incluídas?",
    answer: "Cada projeto inclui um número pré-definido de revisões, informado em contrato. Alterações adicionais podem ser realizadas mediante ajuste de prazo e valor."
  },
  {
    category: "PERGUNTAS GERAIS",
    question: "Alterações no projeto impactam o prazo?",
    answer: "Sim. Modificações após o início da produção podem influenciar o cronograma. Sempre informamos previamente qualquer impacto em prazo ou valor antes de prosseguir."
  },
  {
    category: "PERGUNTAS GERAIS",
    question: "Qual é o prazo médio de entrega?",
    answer: "O prazo varia conforme a complexidade do projeto e a quantidade de imagens contratadas. Os prazos são definidos e acordados antes do início do trabalho."
  },

  // INTERIOR/EXTERIOR RENDERING
  {
    category: "IMAGENS EXTERNAS E INTERNAS",
    question: "As imagens internas representam fielmente iluminação e atmosfera do ambiente?",
    answer: "Sim. As imagens internas são desenvolvidas considerando orientação solar, iluminação natural e artificial, além da proposta estética do projeto, para transmitir a atmosfera real do espaço."
  },
  {
    category: "IMAGENS EXTERNAS E INTERNAS",
    question: "É possível visualizar diferentes cenários de iluminação?",
    answer: "Sim. Podemos simular diferentes cenários, como iluminação diurna, noturna ou luz artificial, conforme o objetivo da apresentação e o escopo contratado."
  },
  {
    category: "IMAGENS EXTERNAS E INTERNAS",
    question: "Os materiais e acabamentos podem ser alterados durante o processo?",
    answer: "Sim. Alterações de materiais podem ser solicitadas dentro das revisões previstas, respeitando o estágio do projeto e o escopo definido."
  },
  {
    category: "IMAGENS EXTERNAS E INTERNAS",
    question: "As imagens internas ajudam na definição do projeto?",
    answer: "Sim. Elas auxiliam na escolha de materiais, cores, mobiliário e iluminação, tornando o processo de decisão mais claro e reduzindo ajustes durante a obra."
  },
  {
    category: "IMAGENS EXTERNAS E INTERNAS",
    question: "Vocês inserem mobiliário e objetos decorativos?",
    answer: "Sim. O mobiliário, a decoração e os elementos de ambientação são selecionados de acordo com o conceito do projeto, sempre com cuidado para não comprometer a leitura arquitetônica."
  },
  {
    category: "IMAGENS EXTERNAS E INTERNAS",
    question: "As imagens externas consideram o entorno e a implantação?",
    answer: "Sim. As imagens externas levam em conta implantação, proporções, volumetria, paisagismo e relação com o entorno, sempre que essas informações são fornecidas."
  },
  {
    category: "IMAGENS EXTERNAS E INTERNAS",
    question: "É possível simular diferentes horários do dia?",
    answer: "Sim. Podemos trabalhar com diferentes horários e condições de luz para valorizar o projeto destacar volumetria, materiais e texturas."
  },
  {
    category: "IMAGENS EXTERNAS E INTERNAS",
    question: "As imagens externas ajudam na aprovação legal ou comercial?",
    answer: "Sim. Elas são amplamente utilizadas em apresentações para clientes, investidores, materiais de divulgação e processos de aprovação, por facilitarem a compreensão do projeto."
  },
  {
    category: "IMAGENS EXTERNAS E INTERNAS",
    question: "O paisagismo faz parte da imagem externa?",
    answer: "Quando o projeto de paisagismo é fornecido, ele é representado conforme especificação. Caso contrário, podemos sugerir uma ambientação paisagística conceitual, alinhada ao projeto arquitetônico."
  },

  // ARCHITECTURE ANIMATION
  {
    category: "ANIMAÇÕES",
    question: "O que é uma animação arquitetônica?",
    answer: "A animação arquitetônica é um vídeo que apresenta o projeto em movimento, simulando a experiência de percorrer os espaços e compreender volumetria, escala, iluminação e atmosfera de forma dinâmica."
  },
  {
    category: "ANIMAÇÕES",
    question: "Qual a duração média de uma animação arquitetônica?",
    answer: "A duração varia conforme o escopo, mas geralmente os vídeos têm entre 30 segundos e 2 minutos, equilibrando impacto visual e objetividade."
  },
  {
    category: "ANIMAÇÕES",
    question: "A animação pode incluir imagens internas e externas?",
    answer: "Sim. É possível combinar cenas internas e externas em uma única animação, criando uma narrativa completa do projeto."
  },
  {
    category: "ANIMAÇÕES",
    question: "É possível incluir pessoas, veículos e paisagismo?",
    answer: "Sim. Elementos humanizados podem ser incluídos para dar escala, vida e realismo à animação, sempre de forma equilibrada e coerente com o projeto."
  },
  {
    category: "ANIMAÇÕES",
    question: "A animação pode ter trilha sonora ou texto?",
    answer: "Sim. Podemos incluir trilha sonora, textos, legendas ou logotipo, conforme o objetivo do vídeo e o uso previsto."
  },
  {
    category: "ANIMAÇÕES",
    question: "Alterações no projeto impactam a animação?",
    answer: "Sim. Mudanças no projeto após o início da animação podem exigir retrabalho e influenciar prazos e custos. Essas situações são sempre comunicadas previamente."
  },
  {
    category: "ANIMAÇÕES",
    question: "Qual o prazo médio de entrega?",
    answer: "O prazo depende da complexidade do projeto, da duração do vídeo e do nível de realismo desejado. O cronograma é definido antes do início do trabalho."
  },
  {
    category: "ANIMAÇÕES",
    question: "Em quais formatos o vídeo é entregue?",
    answer: "As animações são entregues em formatos adequados para redes sociais, apresentações e site, conforme a necessidade do cliente."
  },

  // VIRTUAL TOUR
  {
    category: "TOUR VIRTUAL",
    question: "O que é um tour virtual arquitetônico?",
    answer: "É uma experiência interativa em 360° que permite explorar os ambientes do projeto livremente, proporcionando uma compreensão realista de espaço, escala e atmosfera."
  },
  {
    category: "TOUR VIRTUAL",
    question: "Qual a diferença entre tour virtual e animação?",
    answer: "No tour virtual, o usuário escolhe o percurso e o ponto de vista. Na animação, o caminho é guiado por um vídeo com cenas pré-definidas."
  },
  {
    category: "TOUR VIRTUAL",
    question: "Para quais projetos o tour virtual é indicado?",
    answer: "É ideal para projetos residenciais, comerciais e empreendimentos imobiliários, especialmente para apresentações, vendas e aprovações à distância."
  },
  {
    category: "TOUR VIRTUAL",
    question: "O tour virtual funciona em celular e computador?",
    answer: "Sim. O acesso é feito diretamente pelo navegador, sem necessidade de instalação de aplicativos."
  },
  {
    category: "TOUR VIRTUAL",
    question: "Posso escolher quais ambientes farão parte do tour?",
    answer: "Sim. Os ambientes são definidos conforme o objetivo do projeto e o escopo contratado."
  },
  {
    category: "TOUR VIRTUAL",
    question: "O tour virtual pode ser usado para vendas?",
    answer: "Sim. Ele aumenta o engajamento, reduz dúvidas e aproxima o cliente do projeto, tornando a apresentação mais clara e envolvente."
  },
  {
    category: "TOUR VIRTUAL",
    question: "Como o tour virtual é entregue?",
    answer: "O tour é entregue por meio de um link navegável, que pode ser compartilhado ou integrado ao site do cliente."
  },

  // PRODUCT & BRAND VISUALIZATION
  {
    category: "PRODUTOS",
    question: "O que é visualização de produto?",
    answer: "É a criação de imagens e cenas 3D que representam produtos e marcas de forma estratégica, valorizando design, materiais, identidade visual e posicionamento de mercado."
  },
  {
    category: "PRODUTOS",
    question: "Para quais tipos de marcas ou produtos esse serviço é indicado?",
    answer: "É indicado para marcas de mobiliário, revestimentos, iluminação, objetos de design, incorporadoras e empresas que desejam apresentar seus produtos de forma profissional e impactante."
  },
  {
    category: "PRODUTOS",
    question: "As imagens são realistas ou conceituais?",
    answer: "Podem ser realistas ou conceituais. O estilo é definido conforme o posicionamento da marca, o público-alvo e o objetivo da comunicação."
  },
  {
    category: "PRODUTOS",
    question: "A visualização pode seguir a identidade visual da marca?",
    answer: "Sim. Todas as imagens são desenvolvidas respeitando identidade visual, linguagem, paleta de cores e valores da marca."
  },
  {
    category: "PRODUTOS",
    question: "Vocês criam cenários para os produtos?",
    answer: "Sim. Desenvolvemos cenários e ambientações que contextualizam o produto e fortalecem a narrativa da marca, sem competir com o foco principal."
  },
  {
    category: "PRODUTOS",
    question: "Posso usar as imagens para campanhas e redes sociais?",
    answer: "Sim. As imagens podem ser utilizadas em campanhas publicitárias, redes sociais, site, catálogos e materiais institucionais, conforme definido em contrato."
  },
  {
    category: "PRODUTOS",
    question: "O serviço inclui modelagem do produto?",
    answer: "Sim. Caso o produto não possua modelo 3D, realizamos a modelagem a partir de desenhos técnicos, medidas e referências fornecidas."
  },
  {
    category: "PRODUTOS",
    question: "Quantas revisões estão incluídas?",
    answer: "O número de revisões é definido no escopo do projeto. Ajustes adicionais podem impactar prazo e valor."
  },
  {
    category: "PRODUTOS",
    question: "As imagens ajudam na venda do produto?",
    answer: "Sim. Imagens bem produzidas aumentam percepção de valor, fortalecem a marca e contribuem diretamente para decisões de compra."
  },
  {
    category: "PRODUTOS",
    question: "Por que investir em visualização de marca e produto?",
    answer: "Porque imagens estratégicas comunicam qualidade, profissionalismo e diferenciação, fortalecendo a presença da marca no mercado."
  }
];