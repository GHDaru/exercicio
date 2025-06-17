
import { WorkflowData } from './types';

export const INITIAL_WORKFLOW_DATA: WorkflowData = {
  mainTitle: "Workflow de Engenharia de Software: Da Ideia à Especificação Técnica",
  phases: [
    {
      id: "fase1",
      title: "Fase 1: Iniciação e Descoberta",
      description: "Esta fase foca no reconhecimento de necessidades, definição inicial do problema, análise de viabilidade e identificação dos principais interessados.",
      activities: [
        {
          title: "Identificação da Necessidade/Oportunidade",
          details: "Reconhecer um problema a ser resolvido, uma oportunidade de mercado, uma otimização de processo existente ou uma nova funcionalidade demandada.",
          origin: "Feedback de clientes, análise de mercado, necessidades internas da empresa, ideias inovadoras.",
          deliverables: ["Breve descrição da ideia/problema."]
        },
        {
          title: "Definição do Problema e Objetivos de Alto Nível",
          details: "Articular claramente qual problema o software visa resolver e quais são os principais objetivos a serem alcançados com a solução.",
          keyQuestions: "Qual dor estamos curando? Qual valor estamos entregando? Quem se beneficia?",
          deliverables: ["Declaração do Problema", "Objetivos SMART (Específicos, Mensuráveis, Alcançáveis, Relevantes, Temporais)."]
        },
        {
          title: "Análise de Viabilidade Preliminar (Business Case)",
          details: "Avaliar se a ideia é viável do ponto de vista técnico, econômico e operacional.",
          considerations: "Custo estimado vs. benefício esperado, recursos disponíveis, riscos iniciais, alinhamento estratégico.",
          deliverables: ["Estudo de Viabilidade Simplificado / Business Case Preliminar."]
        },
        {
          title: "Identificação das Partes Interessadas (Stakeholders)",
          details: "Listar todos os indivíduos, grupos ou organizações que serão afetados pelo projeto ou que têm interesse nele.",
          examples: "Usuários finais, patrocinadores, equipe de desenvolvimento, marketing, vendas, suporte.",
          deliverables: ["Lista de Stakeholders e seus papéis/interesses."]
        }
      ],
      status: 'todo',
      userInputForAI: null,
      aiGeneratedOutput: null,
    },
    {
      id: "fase2",
      title: "Fase 2: Análise e Levantamento de Requisitos",
      description: "Concentra-se na coleta, análise, documentação, validação e priorização dos requisitos do software.",
      activities: [
        {
          title: "Coleta de Requisitos",
          details: "Reunir informações detalhadas sobre o que o software deve fazer.",
          techniques: "Entrevistas com stakeholders, workshops, questionários, observação de usuários, análise de documentos existentes, brainstorming, prototipagem.",
          deliverables: ["Notas de reuniões, transcrições, rascunhos de requisitos."]
        },
        {
          title: "Análise e Documentação de Requisitos",
          details: "Organizar, refinar e documentar os requisitos coletados de forma clara, concisa e não ambígua.",
          categories: {
            functional: "O que o sistema deve fazer (ex: \"O sistema deve permitir que o usuário se cadastre com email e senha\").",
            nonFunctional: "Como o sistema deve ser (ex: \"O sistema deve responder a requisições em menos de 2 segundos\", \"O sistema deve ser compatível com os navegadores X, Y, Z\", \"O sistema deve garantir a segurança dos dados do usuário\").",
            business: "Objetivos de alto nível da organização que o sistema deve suportar.",
            user: "Descrições de como os usuários interagirão com o sistema (muitas vezes expressos como Histórias de Usuário ou Casos de Uso)."
          },
          deliverables: ["Documento de Especificação de Requisitos de Software (ERS) ou Backlog do Produto (com Histórias de Usuário detalhadas)."]
        },
        {
          title: "Validação e Verificação de Requisitos",
          details: "Garantir que os requisitos documentados são corretos, completos, consistentes, testáveis e realmente representam as necessidades dos stakeholders.",
          techniques: "Revisões com stakeholders, protótipos, walkthroughs.",
          deliverables: ["Requisitos validados e aprovados pelos stakeholders."]
        },
        {
          title: "Priorização de Requisitos",
          details: "Classificar os requisitos por ordem de importância e urgência, especialmente se o desenvolvimento for incremental (ex: MVP - Produto Mínimo Viável).",
          techniques: "MoSCoW (Must have, Should have, Could have, Won't have), votação, análise de valor vs. esforço.",
          deliverables: ["Lista de requisitos priorizada."]
        }
      ],
      status: 'todo',
      userInputForAI: null,
      aiGeneratedOutput: null,
    },
    {
      id: "fase3",
      title: "Fase 3: Design de Alto Nível (Arquitetural)",
      description: "Foco na criação da estrutura geral do sistema, design conceitual da interface e experiência do usuário, modelo de dados e integrações.",
      activities: [
        {
          title: "Definição da Arquitetura do Software",
          details: "Criar uma visão de alto nível da estrutura do sistema, seus principais componentes, módulos e como eles interagem.",
          considerations: "Escalabilidade, performance, segurança, manutenibilidade, tecnologias a serem utilizadas (frameworks, linguagens, bancos de dados).",
          deliverables: ["Documento de Design Arquitetural (DDA)", "Diagramas de arquitetura (ex: C4 Model, diagramas de componentes, de implantação)."]
        },
        {
          title: "Design da Interface do Usuário (UI) e Experiência do Usuário (UX) - Conceitual",
          details: "Esboçar os fluxos de navegação, a disposição dos elementos nas telas e a interação geral do usuário com o sistema.",
          focus: "Usabilidade, acessibilidade, intuição.",
          deliverables: ["Wireframes de baixo/médio fidelidade", "Fluxogramas de navegação", "Personas de usuário", "Jornadas do usuário."]
        },
        {
          title: "Design do Modelo de Dados (Conceitual/Lógico)",
          details: "Definir as principais entidades de dados, seus atributos e os relacionamentos entre elas.",
          deliverables: ["Diagrama Entidade-Relacionamento (DER) conceitual/lógico."]
        },
        {
          title: "Identificação de Interfaces Externas e Integrações",
          details: "Mapear como o sistema se comunicará com outros sistemas, APIs de terceiros ou hardware.",
          deliverables: ["Lista de integrações necessárias e especificações preliminares de interface."]
        }
      ],
      status: 'todo',
      userInputForAI: null,
      aiGeneratedOutput: null,
    },
    {
      id: "fase4",
      title: "Fase 4: Especificações Técnicas Detalhadas",
      description: "Elaboração de todos os detalhes técnicos necessários para a equipe de desenvolvimento construir o software.",
      activities: [
        {
          title: "Design Detalhado dos Componentes/Módulos",
          details: "Para cada componente principal identificado na arquitetura, detalhar sua lógica interna, algoritmos, estruturas de dados específicas e responsabilidades.",
          deliverables: ["Especificações detalhadas por módulo/componente", "Diagramas de classes", "Diagramas de sequência (se aplicável)."]
        },
        {
          title: "Design Detalhado da Interface do Usuário (UI) e Experiência do Usuário (UX)",
          details: "Transformar os wireframes em mockups de alta fidelidade ou protótipos interativos, definindo paleta de cores, tipografia, iconografia e todos os aspectos visuais e de interação.",
          deliverables: ["Mockups de alta fidelidade", "Guia de estilo (style guide)", "Protótipos interativos."]
        },
        {
          title: "Especificação Detalhada do Banco de Dados (Físico)",
          details: "Traduzir o modelo de dados lógico para um esquema de banco de dados físico, definindo tabelas, colunas, tipos de dados, chaves primárias/estrangeiras, índices, constraints.",
          deliverables: ["Esquema do Banco de Dados (DDL scripts)", "Dicionário de dados."]
        },
        {
          title: "Especificação de APIs e Contratos de Interface",
          details: "Para APIs internas ou externas, definir endpoints, métodos HTTP, formatos de requisição/resposta (JSON, XML), parâmetros, códigos de status, autenticação e autorização.",
          tools: "OpenAPI (Swagger).",
          deliverables: ["Documentação de API (ex: arquivo Swagger/OpenAPI)."]
        },
        {
          title: "Definição de Regras de Negócio Detalhadas e Algoritmos",
          details: "Documentar precisamente as regras de negócio complexas e os algoritmos que o sistema implementará. Pseudocódigo pode ser útil aqui.",
          deliverables: ["Seção de regras de negócio no documento de especificação", "Pseudocódigo para algoritmos complexos."]
        },
        {
          title: "Considerações de Segurança Detalhadas",
          details: "Especificar mecanismos de segurança a serem implementados (ex: criptografia de dados em repouso/trânsito, controle de acesso baseado em papéis, prevenção contra XSS, SQL Injection).",
          deliverables: ["Requisitos de segurança detalhados."]
        },
        {
          title: "Plano de Testes (Preliminar)",
          details: "Com base nas especificações, começar a esboçar o plano de testes, identificando os principais cenários de teste, tipos de teste (unitário, integração, sistema, aceitação) e critérios de aceitação.",
          deliverables: ["Esboço do Plano de Testes", "Critérios de aceitação para funcionalidades chave."]
        },
        {
          title: "Consolidação das Especificações Técnicas",
          details: "Reunir todos os artefatos produzidos (documentos de design, especificações de API, esquemas de BD, mockups, etc.) em um pacote coeso e compreensível para a equipe de desenvolvimento.",
          deliverables: ["Pacote de Especificações Técnicas Detalhadas (pronto para o \"kick-off\" do desenvolvimento)."]
        }
      ],
      status: 'todo',
      userInputForAI: null,
      aiGeneratedOutput: null,
    }
  ],
  additionalConsiderations: {
    title: "Considerações Adicionais",
    points: [
      "Iteração: Em muitos projetos modernos (especialmente Ágeis), várias dessas fases e atividades ocorrem de forma iterativa e incremental. Por exemplo, pode-se fazer uma análise e design detalhado para um conjunto pequeno de funcionalidades (sprint) e depois repetir para o próximo.",
      "Comunicação: A comunicação constante entre todas as partes interessadas é crucial em todas as fases.",
      "Ferramentas: Utilizar ferramentas apropriadas para cada etapa (ex: JIRA/Trello para gerenciamento de requisitos/tarefas, Figma/Sketch para UI/UX, Lucidchart/Draw.io para diagramas, Confluence/Notion para documentação, Swagger para APIs).",
      "Revisão e Aprovação: Cada entregável chave deve ser revisado e aprovado pelos stakeholders relevantes antes de prosseguir para a próxima fase."
    ]
  }
};
