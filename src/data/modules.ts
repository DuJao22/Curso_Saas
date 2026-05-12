export interface Step {
  title: string;
  duration?: string;
  content: string[];
  code?: string;
  language?: string;
  link?: { text: string; url: string };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  steps: Step[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  modules: Module[];
}

export const courses: Course[] = [
  {
    id: "course-1",
    title: "Introdução ao ProLearn Pro",
    subtitle: "Acelere seus resultados criando Landing Pages incríveis com IA",
    description: "Neste curso introdutório, você aprenderá as bases para criar e gerenciar seus projetos com GitHub e ferramentas de IA.",
    image: "https://i.postimg.cc/kgmY092W/image-removebg-preview-(20).png",
    modules: [
      {
        id: "mod-1-1",
        title: "Módulo 1: Criando uma Conta no GitHub (Parte 1)",
        description: "Aprenda o passo a passo inicial para criar sua conta no GitHub e entrar no mundo da programação.",
        steps: [
          {
            title: "Etapa 1 — Acessar o site",
            duration: "1 min",
            content: [
              "Abra o navegador",
              "Entre em: GitHub Oficial (https://github.com)",
              "Clique em 'Sign up'"
            ]
          },
          {
            title: "Etapa 2 — Colocar o e-mail",
            duration: "2 min",
            content: [
              "Digite seu melhor e-mail",
              "Use um e-mail que você tenha acesso",
              "Clique em Continue"
            ]
          },
          {
            title: "Etapa 3 — Criar senha",
            duration: "2 min",
            content: [
              "Crie uma senha forte:",
              "• Letras maiúsculas",
              "• Letras minúsculas",
              "• Números",
              "• Símbolos",
              "Exemplo: DsCompany@2026"
            ]
          }
        ]
      },
      {
        id: "mod-1-2",
        title: "Módulo 2: Configurando sua Identidade Dev",
        description: "Finalize sua conta no GitHub escolhendo um nome profissional e validando seu acesso.",
        steps: [
          {
            title: "Etapa 4 — Escolher nome de usuário",
            duration: "2 min",
            content: [
              "Escolha um nome profissional.",
              "Exemplos: paulo.dev, dscompanydev, layoncodes, paulosites",
              "Evite: muitos números, nomes difíceis, nomes infantis"
            ]
          },
          {
            title: "Etapa 5 — Verificação do GitHub",
            duration: "1–3 min",
            content: [
              "Complete o captcha/verificação de segurança.",
              "Clique em 'Create account'"
            ]
          },
          {
            title: "Etapa 6 — Confirmar o e-mail",
            duration: "2 min",
            content: [
              "Abra seu e-mail",
              "Procure a mensagem do GitHub",
              "Clique no link de confirmação",
              "Conta Criada ✅"
            ]
          }
        ]
      },
      {
        id: "mod-1-3",
        title: "Módulo 3: Ferramentas e IA para Landing Pages",
        description: "Domine a estrutura, design e prompt engineering para criar páginas profissionais de alta conversão.",
        steps: [
          {
            title: "Fase 1 — Entender a Estrutura de uma Landing Page",
            content: [
              "O objetivo é olhar uma landing page e conseguir entender: 'Por que isso vende?'",
              "Estrutura básica: Header, Hero, CTA, Benefícios, Provas sociais, FAQ, Rodapé."
            ]
          },
          {
            title: "Fase 2 — Aprender Design Moderno",
            content: [
              "Hierarquia visual, Espaçamento, Tipografia, Paleta de cores, Contraste, Responsividade."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "Do Zero ao Site Online",
    subtitle: "GitHub, HTML e Vercel para Iniciantes",
    description: "Aprenda a criar sua primeira página HTML, salvar no GitHub, usar Git profissionalmente e publicar seu site online gratuitamente.",
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=80&w=400",
    modules: [
      {
        id: "mod-2-1",
        title: "Módulo 1: Introdução ao Desenvolvimento Web",
        description: "Explicar como funciona um site.",
        steps: [
          {
            title: "Aula 1 — O que é Frontend",
            content: ["HTML (Estrutura)", "CSS (Estilo)", "JavaScript (Função)", "Estrutura da web"]
          },
          {
            title: "Aula 2 — O que é GitHub",
            content: ["GitHub é uma plataforma usada para armazenar projetos e códigos."]
          },
          {
            title: "Aula 3 — O que é Git",
            content: ["Git é um sistema de versionamento que salva alterações do projeto."]
          },
          {
            title: "Aula 4 — O que é Hospedagem",
            content: ["Hospedagem é colocar o site online."]
          }
        ]
      },
      {
        id: "mod-2-2",
        title: "Módulo 2: Instalando Ferramentas",
        description: "Preparar ambiente profissional.",
        steps: [
          {
            title: "Aula 1 — Instalando VS Code",
            content: ["Download oficial do VS Code", "Editor de código", "Extensões", "Terminal integrado"],
            link: { text: "Download VS Code", url: "https://code.visualstudio.com/" }
          },
          {
            title: "Aula 2 — Instalando Git",
            content: ["Controle de versões", "Terminal Git"],
            link: { text: "Git Oficial", url: "https://git-scm.com/" }
          },
          {
            title: "Aula 3 — Criando Estrutura Inicial",
            content: ["Criar Pasta: meu-primeiro-site", "Abrir no VS Code", "Estrutura do projeto"]
          }
        ]
      },
      {
        id: "mod-2-3",
        title: "Módulo 3: Criando Conta no GitHub",
        description: "Criar conta profissional.",
        steps: [
          {
            title: "Aula 1 — Entrando no GitHub",
            content: ["Acesse github.com"],
            link: { text: "GitHub", url: "https://github.com" }
          },
          {
            title: "Aula 2 — Criando Conta",
            content: ["Preencher: Email, Senha, Username"]
          },
          {
            title: "Aula 3 — Verificação",
            content: ["Confirmação email", "Captcha"]
          },
          {
            title: "Aula 4 — Configurando Perfil",
            content: ["Adicionar: Foto, Bio, Nome", "Seu perfil GitHub será seu portfólio profissional."]
          }
        ]
      },
      {
        id: "mod-2-4",
        title: "Módulo 4: Criando Primeira Página HTML",
        description: "Criar primeiro site.",
        steps: [
          {
            title: "Aula 1 — O que é HTML",
            content: ["HTML é a estrutura do site."]
          },
          {
            title: "Aula 2 — Criando Arquivo HTML",
            content: ["Criar arquivo: index.html"]
          },
          {
            title: "Aula 3 — Estrutura Base HTML",
            content: ["Adicione a estrutura básica do HTML5."],
            code: `<!DOCTYPE html>
<html>
<head>
    <title>Meu Primeiro Site</title>
</head>
<body>

    <h1>Olá Mundo</h1>
    <p>Meu primeiro site online</p>

</body>
</html>`,
            language: "html"
          },
          {
            title: "Aula 4 — Abrindo no Navegador",
            content: ["Clique duas vezes no arquivo", "Visualizar página no navegador"]
          }
        ]
      },
      {
        id: "mod-2-5",
        title: "Módulo 5: Adicionando CSS",
        description: "Melhorar visual.",
        steps: [
          {
            title: "Aula 1 — O que é CSS",
            content: ["CSS estiliza a página."]
          },
          {
            title: "Aula 2 — Criando style.css",
            content: ["Crie o arquivo style.css na mesma pasta."]
          },
          {
            title: "Aula 3 — Conectando CSS",
            content: ["Adicione o link no head do seu HTML."],
            code: `<link rel="stylesheet" href="style.css">`,
            language: "html"
          },
          {
            title: "Aula 4 — Estilizando Página",
            content: ["Adicione estilos básicos."],
            code: `body{
    background:#111;
    color:white;
    text-align:center;
    font-family:Arial;
}`,
            language: "css"
          }
        ]
      },
      {
        id: "mod-2-6",
        title: "Módulo 6: Estrutura Profissional de Projeto",
        description: "Organizar projeto.",
        steps: [
          {
            title: "Estrutura recomendada",
            content: ["index.html", "style.css", "img/ (pasta para imagens)"]
          }
        ]
      },
      {
        id: "mod-2-7",
        title: "Módulo 7: Introdução ao Git",
        description: "Versionar projeto.",
        steps: [
          {
            title: "Aula 1 — Abrindo Terminal",
            content: ["No VS Code: CTRL + `"]
          },
          {
            title: "Aula 2 — Inicializando Git",
            content: ["Agora o projeto está sendo controlado pelo Git."],
            code: "git init",
            language: "bash"
          },
          {
            title: "Aula 3 — Verificando Arquivos",
            content: ["Verifique arquivos modificados e rastreados."],
            code: "git status",
            language: "bash"
          }
        ]
      },
      {
        id: "mod-2-8",
        title: "Módulo 8: Primeiro Commit",
        description: "Salvar primeira versão.",
        steps: [
          {
            title: "Aula 1 — Adicionando Arquivos",
            content: [],
            code: "git add .",
            language: "bash"
          },
          {
            title: "Aula 2 — Criando Commit",
            content: ["Commit é um ponto salvo do projeto."],
            code: "git commit -m \"Primeiro site HTML\"",
            language: "bash"
          }
        ]
      },
      {
        id: "mod-2-9",
        title: "Módulo 9: Enviando para GitHub",
        description: "Subir projeto online.",
        steps: [
          {
            title: "Aula 1 — Criando Repositório",
            content: ["No GitHub: New Repository -> meu-primeiro-site"]
          },
          {
            title: "Aula 2 — Conectando Projeto",
            content: [],
            code: "git remote add origin LINK_DO_REPOSITORIO",
            language: "bash"
          },
          {
            title: "Aula 3 — Enviando Projeto",
            content: ["Agora o projeto está salvo no GitHub."],
            code: "git push -u origin main",
            language: "bash"
          }
        ]
      },
      {
        id: "mod-2-10",
        title: "Módulo 10: Hospedagem com Vercel",
        description: "Publicar site online.",
        steps: [
          {
            title: "Aula 1 — O que é Vercel",
            content: ["Vercel hospeda sites gratuitamente."],
            link: { text: "Vercel", url: "https://vercel.com" }
          },
          {
            title: "Aula 2 — Criando Conta",
            content: ["Login: Continue with GitHub"]
          },
          {
            title: "Aula 3 — Importando Projeto",
            content: ["Clique: Add New Project"]
          },
          {
            title: "Aula 4 — Selecionando Repositório",
            content: ["Escolha: meu-primeiro-site"]
          },
          {
            title: "Aula 5 — Deploy",
            content: ["Deploy significa publicar o site."]
          }
        ]
      },
      {
        id: "mod-2-11",
        title: "Módulo 11: Atualizando Projeto",
        description: "Ensinar atualizações.",
        steps: [
          {
            title: "Aula 1 — Editando HTML",
            content: [],
            code: "<button>Entrar</button>",
            language: "html"
          },
          {
            title: "Aula 2 — Novo Commit",
            content: ["Toda alteração enviada atualiza automaticamente o site."],
            code: "git add .\ngit commit -m \"Adicionado botão\"\ngit push",
            language: "bash"
          }
        ]
      },
      {
        id: "mod-2-12",
        title: "Módulo 12: Projeto Final",
        description: "Criar landing page simples.",
        steps: [
          {
            title: "Objetivo",
            content: ["Título, Botão, Imagem, Footer", "Responsividade", "Design moderno (Dark mode)"]
          }
        ]
      },
      {
        id: "mod-2-13",
        title: "Módulo 13: Melhorias Futuras",
        description: "Mostrar evolução.",
        steps: [
          {
            title: "Próximos passos",
            content: ["JavaScript", "Animações", "APIs", "React", "Tailwind", "Backend"]
          }
        ]
      },
      {
        id: "mod-2-14",
        title: "Módulo 14: GitHub Profissional",
        description: "Transformar GitHub em portfólio.",
        steps: [
          {
            title: "Otimização",
            content: ["README.md", "Organização de Projetos", "Commits organizados"]
          }
        ]
      },
      {
        id: "mod-2-15",
        title: "Módulo 15: Encerramento",
        description: "Conclusão do curso.",
        steps: [
          {
            title: "Resultado Final",
            content: ["✅ HTML", "✅ Git/GitHub", "✅ Deploy na Vercel", "✅ Portfólio Inicial"]
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "Vibe Coding",
    subtitle: "Criando Landing Pages com IA do Zero ao Deploy",
    description: "Aprenda a criar landing pages modernas usando Inteligência Artificial, fazer versionamento no GitHub e publicar online na Vercel.",
    image: "https://images.unsplash.com/photo-1627393100177-b4297e79a5be?auto=format&fit=crop&q=80&w=400",
    modules: [
      {
        id: "mod-3-1",
        title: "Módulo 1: Introdução ao Vibe Coding",
        description: "Ensinar o conceito de criação com IA.",
        steps: [
          {
            title: "Aula 1 — O que é Vibe Coding",
            content: ["Desenvolvimento com IA", "Criação baseada em prompts", "IA gerando código"]
          },
          {
            title: "Aula 2 — Como IA Cria Sites",
            content: ["A IA consegue gerar: HTML, CSS, JavaScript, Componentes, Responsividade"]
          },
          {
            title: "Aula 3 — Ferramentas Necessárias",
            content: ["GitHub: Salvar projetos", "Lovable: Criar páginas", "v0: Interfaces modernas", "Vercel: Hospedagem"]
          }
        ]
      },
      {
        id: "mod-3-2",
        title: "Módulo 2: Criando Conta no GitHub",
        description: "Preparar ambiente profissional.",
        steps: [
          {
            title: "Aula 1 — O que é GitHub",
            content: ["GitHub é onde seus projetos ficam salvos."]
          },
          {
            title: "Aula 2 — Criando Conta",
            content: ["Preencha: Email, Senha, Username"],
            link: { text: "GitHub", url: "https://github.com" }
          },
          {
            title: "Aula 3 — Verificação",
            content: ["Confirmar email", "Validar conta"]
          }
        ]
      },
      {
        id: "mod-3-3",
        title: "Módulo 3: Conhecendo as IAs de Criação",
        description: "Apresentar ferramentas.",
        steps: [
          {
            title: "Aula 1 — Lovable",
            content: ["Landing pages, Dashboards, Design moderno"],
            link: { text: "Lovable", url: "https://lovable.dev" }
          },
          {
            title: "Aula 2 — Bolt.new",
            content: ["Apps completos, Backend, Frontend"],
            link: { text: "Bolt.new", url: "https://bolt.new" }
          }
        ]
      },
      {
        id: "mod-3-4",
        title: "Módulo 4: Engenharia de Prompt",
        description: "Ensinar prompts profissionais.",
        steps: [
          {
            title: "Aula 1 — Como IA Entende Prompts",
            content: ["A IA interpreta: contexto, estilo, layout, objetivo"]
          },
          {
            title: "Aula 2 — Estrutura de Prompt Profissional",
            content: ["Objetivo, Estilo, Cores, Responsividade, Animações, CTA, Seções"]
          },
          {
            title: "Aula 3 — Prompt Simples vs Profissional",
            content: ["Quanto mais detalhado o prompt, melhor o resultado."],
            code: `Prompt Profissional:
Crie uma landing page premium para uma agência de marketing digital.
Use: dark mode, design futurista, gradientes modernos, glassmorphism, animações suaves, botão WhatsApp...`,
            language: "text"
          }
        ]
      },
      {
        id: "mod-3-5",
        title: "Módulo 5: Criando Primeira Landing Page",
        description: "Criar projeto completo.",
        steps: [
          {
            title: "Aula 1 — Criando Conta na IA",
            content: ["Acesse o Lovable e faça login com Google."],
            link: { text: "Lovable", url: "https://lovable.dev" }
          },
          {
            title: "Aula 2 — Criando Projeto",
            content: ["Clique em New Project"]
          },
          {
            title: "Aula 3 — Inserindo Prompt",
            content: ["Use um prompt detalhado para sua primeira página."],
            code: "Crie uma landing page premium para um curso online de marketing digital.\nUse: dark mode, design minimalista, gradientes modernos, hero section, CTA forte...",
            language: "text"
          }
        ]
      },
      {
        id: "mod-3-8",
        title: "Módulo 8: Git e GitHub",
        description: "Salvar projeto profissionalmente.",
        steps: [
          {
            title: "Aula 1 — O que é Git",
            content: ["Git salva versões do projeto."]
          },
          {
            title: "Aula 2 — Integração com GitHub",
            content: ["Na ferramenta de IA, clique em 'Connect GitHub'"]
          }
        ]
      },
      {
        id: "mod-3-10",
        title: "Módulo 10: Hospedagem na Vercel",
        description: "Publicar projeto.",
        steps: [
          {
            title: "Aula 1 — O que é Vercel",
            content: ["Vercel hospeda sites gratuitamente."],
            link: { text: "Vercel", url: "https://vercel.com" }
          },
          {
            title: "Aula 2 — Login com GitHub",
            content: ["Faça login com sua conta do GitHub."]
          },
          {
            title: "Aula 5 — Deploy",
            content: ["Clique em Deploy para colocar seu site online."]
          }
        ]
      },
      {
        id: "mod-3-15",
        title: "Módulo 15: Projeto Final",
        description: "Criar landing page profissional completa.",
        steps: [
          {
            title: "Checklist do Projeto",
            content: ["✅ Hero section", "✅ CTA", "✅ Responsividade", "✅ GitHub & Deploy Vercel"]
          }
        ]
      }
    ]
  },
  {
    id: "course-4",
    title: "Mini SaaS Profissional",
    subtitle: "Flask + SQLiteCloud + Render",
    description: "Aprenda a criar um Mini SaaS completo com banco de dados online, autenticação, dashboard profissional e hospedagem gratuita.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
    modules: [
      {
        id: "mod-4-1",
        title: "Módulo 1: Introdução ao Projeto",
        description: "Explicar arquitetura SaaS.",
        steps: [
          {
            title: "Aula 1 — Como Funciona um SaaS",
            content: ["Frontend", "Backend", "Banco", "Hospedagem"]
          },
          {
            title: "Aula 3 — Fluxo Completo",
            content: ["Frontend → Flask → SQLiteCloud → Render"]
          }
        ]
      },
      {
        id: "mod-4-3",
        title: "Módulo 3: Criando Projeto Flask",
        description: "Criar backend.",
        steps: [
          {
            title: "Aula 1 — Ambiente Virtual",
            code: "python -m venv venv",
            language: "bash",
            content: []
          },
          {
            title: "Aula 4 — Criando app.py",
            content: ["Crie o arquivo principal do Flask."],
            code: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return \"Mini SaaS Online\"\n\nif __name__ == '__main__':\n    app.run(debug=True)`,
            language: "python"
          }
        ]
      },
      {
        id: "mod-4-5",
        title: "Módulo 5: SQLiteCloud",
        description: "Criar banco online.",
        steps: [
          {
            title: "Aula 1 — Criando Conta",
            content: ["Acesse o SQLiteCloud e crie sua conta."],
            link: { text: "SQLiteCloud", url: "https://sqlitecloud.io" }
          },
          {
            title: "Aula 4 — Pegando String Conexão",
            content: ["A plataforma fornecerá a URL de conexão: sqlitecloud://usuario:senha@host:porta/database"]
          }
        ]
      },
      {
        id: "mod-4-6",
        title: "Módulo 6: Conectando Flask ao SQLiteCloud",
        description: "Integrar banco online.",
        steps: [
          {
            title: "Instalar Biblioteca",
            code: "pip install sqlitecloud",
            language: "bash",
            content: []
          },
          {
            title: "Criar Conexão",
            content: ["Crie o arquivo database/db.py"],
            code: `import sqlitecloud\n\nconn = sqlitecloud.connect(\n    \"sqlitecloud://usuario:senha@host/database\"\n)`,
            language: "python"
          }
        ]
      },
      {
        id: "mod-4-10",
        title: "Módulo 10: Preparando para Deploy",
        description: "Configurar Render.",
        steps: [
          {
            title: "requirements.txt",
            code: "pip freeze > requirements.txt",
            language: "bash",
            content: []
          },
          {
            title: "Criar Procfile",
            content: ["Arquivo essencial para o Render saber como rodar seu app."],
            code: "web: gunicorn app:app",
            language: "text"
          }
        ]
      },
      {
        id: "mod-4-11",
        title: "Módulo 11: Hospedagem no Render",
        description: "Publicar SaaS online.",
        steps: [
          {
            title: "Aula 1 — Criando Conta",
            content: ["Crie sua conta no Render."],
            link: { text: "Render", url: "https://render.com" }
          },
          {
            title: "Aula 6 — Deploy",
            content: ["Acesse seu dashboard no Render e faça o deploy do serviço web."]
          }
        ]
      },
      {
        id: "mod-4-15",
        title: "Módulo 15: Projeto Final",
        description: "Criar Mini SaaS completo.",
        steps: [
          {
            title: "Requisitos",
            content: ["✅ Login/Cadastro", "✅ Banco online", "✅ Dashboard", "✅ Deploy no Render"]
          }
        ]
      }
    ]
  },
  {
    id: "course-5",
    title: "BarberSaaS Professional",
    subtitle: "Criando um Sistema Profissional para Barbearias",
    description: "Aprenda a criar um Mini SaaS completo para barbearias com agendamentos, controle financeiro e banco de dados online.",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=400",
    modules: [
      {
        id: "mod-5-1",
        title: "Módulo 1: Introdução ao Projeto",
        description: "Mostrar o sistema final e arquitetura.",
        steps: [
          {
            title: "Aula 1 — Apresentando o BarberSaaS",
            content: ["Demonstração do dashboard, login, agenda e clientes."]
          },
          {
            title: "Aula 3 — Arquitetura do Projeto",
            content: ["Frontend → Flask → SQLiteCloud → Render"]
          }
        ]
      },
      {
        id: "mod-5-3",
        title: "Módulo 3: Criando Backend Flask",
        description: "Criar estrutura principal.",
        steps: [
          {
            title: "Aula 1 — Ambiente Virtual",
            code: "python -m venv venv",
            language: "bash",
            content: []
          },
          {
            title: "Aula 4 — Criando app.py",
            content: ["Aqui nasce o sistema."],
            code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return \"Barber SaaS\"\n\nif __name__ == '__main__':\n    app.run(debug=True)",
            language: "python"
          }
        ]
      },
      {
        id: "mod-5-5",
        title: "Módulo 5: Criando Banco Online no SQLiteCloud",
        description: "Criar banco profissional.",
        steps: [
          {
            title: "Aula 1 — O que é SQLiteCloud",
            content: ["SQLiteCloud permite usar SQLite online."],
            link: { text: "SQLiteCloud", url: "https://sqlitecloud.io" }
          },
          {
            title: "Aula 4 — URL de Conexão",
            content: ["Essa URL conecta o sistema ao banco online."],
            code: "sqlitecloud://usuario:senha@host/database",
            language: "text"
          }
        ]
      },
      {
        id: "mod-5-6",
        title: "Módulo 6: Conectando Flask ao Banco",
        description: "Integrar backend.",
        steps: [
          {
            title: "Instalar Biblioteca",
            code: "pip install sqlitecloud",
            language: "bash",
            content: []
          },
          {
            title: "database/db.py",
            code: "import sqlitecloud\n\nconn = sqlitecloud.connect(\n    \"sqlitecloud://usuario:senha@host/database\"\n)",
            language: "python",
            content: []
          }
        ]
      },
      {
        id: "mod-5-7",
        title: "Módulo 7: Sistema de Login",
        description: "Criar autenticação.",
        steps: [
          {
            title: "Aula 1 — Criando Tabela Usuários",
            content: ["Estrutura da tabela de usuários."],
            code: "CREATE TABLE usuarios (\n    id INTEGER PRIMARY KEY,\n    nome TEXT,\n    email TEXT,\n    senha TEXT\n);",
            language: "sql"
          }
        ]
      },
      {
        id: "mod-5-8",
        title: "Módulo 8: Dashboard da Barbearia",
        description: "Criar painel administrativo.",
        steps: [
          {
            title: "Componentes",
            content: ["Total clientes, agendamentos, faturamento, barbeiros, serviços."]
          }
        ]
      },
      {
        id: "mod-5-10",
        title: "Módulo 10: Sistema de Agendamento",
        description: "Criar agenda profissional.",
        steps: [
          {
            title: "Funcionalidades",
            content: ["Cliente, barbeiro, data, horário, serviço.", "Status: confirmado, concluído, cancelado."]
          }
        ]
      },
      {
        id: "mod-5-14",
        title: "Módulo 14: GitHub",
        description: "Salvar projeto profissionalmente.",
        steps: [
          {
            title: "Commits",
            code: "git add .\ngit commit -m \"Primeira versão Barber SaaS\"\ngit push -u origin main",
            language: "bash",
            content: []
          }
        ]
      },
      {
        id: "mod-5-15",
        title: "Módulo 15: Hospedagem no Render",
        description: "Publicar sistema online.",
        steps: [
          {
            title: "Procfile",
            code: "web: gunicorn app:app",
            language: "text",
            content: ["Arquivo de configuração para o Render."]
          },
          {
            title: "Deploy",
            content: ["Faça o deploy do seu Web Service no Render."],
            link: { text: "Render", url: "https://render.com" }
          }
        ]
      },
      {
        id: "mod-5-18",
        title: "Módulo 18: Projeto Final",
        description: "Finalizar sistema profissional.",
        steps: [
          {
            title: "Checklist Final",
            content: ["✅ Login/Cadastro", "✅ Agenda", "✅ SQLiteCloud", "✅ Render Deploy"]
          }
        ]
      }
    ]
  },
  {
    id: "course-6",
    title: "Anti-Sleep Bonus",
    subtitle: "Mantendo seu SaaS e Banco Sempre Online",
    description: "Aprenda a evitar que seu Mini SaaS entre em modo 'sleep' no Render e garanta que seu banco de dados esteja sempre ativo através de pings automáticos.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=400",
    modules: [
      {
        id: "mod-6-1",
        title: "Módulo 1: O Que é Ping?",
        description: "Explicar conceito de monitoramento.",
        steps: [
          {
            title: "O que é Ping?",
            content: ["Ping é uma requisição feita para verificar se o sistema está online.", "Evita que o servidor entre em modo 'sleep' por inatividade."]
          }
        ]
      },
      {
        id: "mod-6-2",
        title: "Módulo 2: Criando Rota de Health Check",
        description: "Criar rota para monitoramento.",
        steps: [
          {
            title: "Criar Rota Flask",
            content: ["Vamos criar uma rota simples apenas para verificar se o sistema está online."],
            code: "@app.route('/health')\ndef health():\n    return {\n        \"status\": \"online\"\n    }",
            language: "python"
          }
        ]
      },
      {
        id: "mod-6-3",
        title: "Módulo 3: Usando UptimeRobot",
        description: "Configurar monitoramento automático gratuito.",
        steps: [
          {
            title: "Configuração",
            content: ["Acesse o UptimeRobot e crie um monitor do tipo HTTP(s) apontando para sua rota /health.", "Defina o intervalo para 5 minutos."],
            link: { text: "UptimeRobot", url: "https://uptimerobot.com" }
          }
        ]
      },
      {
        id: "mod-6-4",
        title: "Módulo 4: Ping no Banco de Dados",
        description: "Verificar conexão banco.",
        steps: [
          {
            title: "Health Check do Banco",
            code: "@app.route('/db-check')\ndef db_check():\n    try:\n        # Teste de conexão aqui\n        return {\"database\": \"online\"}\n    except:\n        return {\"database\": \"offline\"}",
            language: "python",
            content: ["Garanta que seu banco SQLiteCloud também receba requisições para não hibernar."]
          }
        ]
      },
      {
        id: "mod-6-10",
        title: "Módulo 10: Encerramento",
        description: "Conclusão do bônus.",
        steps: [
          {
            title: "Resultado Final",
            content: ["✅ Sistema 24h online", "✅ Monitoramento ativo", "✅ Melhor performance inicial", "✅ Estrutura Profissional"]
          }
        ]
      }
    ]
  },
  {
    id: "course-7",
    title: "Mini SaaS no Replit",
    subtitle: "Criando Sistemas Online com IA",
    description: "Aprenda a criar um Mini SaaS completo diretamente no navegador usando Replit, Flask, banco de dados online e deploy simplificado.",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=400",
    modules: [
      {
        id: "mod-7-1",
        title: "Módulo 1: Introdução ao Replit",
        description: "Conhecer a plataforma IDE online.",
        steps: [
          {
            title: "Aula 1 — O que é Replit",
            content: ["IDE online, hospedagem e backend diretamente no navegador.", "Acesse: replit.com"],
            link: { text: "Replit", url: "https://replit.com" }
          },
          {
            title: "Aula 3 — Conhecendo a Interface",
            content: ["Editor, Terminal, Arquivos, Preview e IA integrada."]
          }
        ]
      },
      {
        id: "mod-7-3",
        title: "Módulo 3: Criando Backend Flask",
        description: "Criar aplicação funcional.",
        steps: [
          {
            title: "Aula 1 — Instalando Flask",
            code: "pip install flask",
            language: "bash",
            content: ["Execute no Shell do Replit."]
          },
          {
            title: "Aula 2 — Criando app.py",
            content: ["Estrutura básica do Flask para o Replit."],
            code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return \"Mini SaaS Online\"\n\napp.run(host='0.0.0.0', port=81)",
            language: "python"
          }
        ]
      },
      {
        id: "mod-7-5",
        title: "Módulo 5: IA do Replit",
        description: "Usar IA para acelerar o desenvolvimento.",
        steps: [
          {
            title: "Aula 1 — Usando IA",
            content: ["O Replit possui IA integrada para ajudar criando código através de prompts."]
          },
          {
            title: "Aula 2 — Primeiro Prompt",
            content: ["Peça para a IA criar elementos do seu sistema."],
            code: "Crie uma tela de login moderna usando HTML e CSS.\nAdicione dark mode e design premium.",
            language: "text"
          }
        ]
      },
      {
        id: "mod-7-7",
        title: "Módulo 7: Banco de Dados Online",
        description: "Criar persistência com SQLiteCloud.",
        steps: [
          {
            title: "Aula 5 — Criando db.py",
            content: ["Conectando seu projeto do Replit ao banco online."],
            code: "import sqlitecloud\n\nconn = sqlitecloud.connect(\n    \"sqlitecloud://usuario:senha@host/database\"\n)",
            language: "python"
          }
        ]
      },
      {
        id: "mod-7-12",
        title: "Módulo 12: Hospedagem no Replit",
        description: "Publicar seu sistema online.",
        steps: [
          {
            title: "Aula 1 — Deployments",
            content: ["O próprio Replit consegue hospedar aplicações. Use a aba Deployments."],
            link: { text: "Deployments no Replit", url: "https://replit.com/docs/deployments" }
          },
          {
            title: "Resultado",
            content: ["Seu sistema será publicado em um link profissional .replit.app"]
          }
        ]
      },
      {
        id: "mod-7-15",
        title: "Módulo 15: Projeto Final",
        description: "Finalizar sistema profissional.",
        steps: [
          {
            title: "Checklist do SaaS",
            content: ["✅ Login/Cadastro", "✅ Dashboard", "✅ Banco Online", "✅ Deploy Ativo"]
          }
        ]
      }
    ]
  }
];

export const modules = courses.flatMap(c => c.modules);

