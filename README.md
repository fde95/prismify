# 🎨 Prismify

> Conversor de imagens moderno e eficiente para transformação em massa ou unitária

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

</div>


## 📋 Sobre o Projeto

Prismify é uma aplicação web desenvolvida para facilitar a conversão de imagens entre diferentes formatos de forma rápida e intuitiva. Com suporte para processamento em massa, você pode converter várias imagens simultaneamente sem perder qualidade.

### ✨ Formatos Suportados

- **WEBP** - Formato moderno e otimizado para web
- **JPEG/JPG** - Formato universal com compressão ajustável
- **PNG** - Formato com suporte a transparência

### 🚀 Funcionalidades

- ✅ Conversão unitária ou em massa
- ✅ Interface moderna e responsiva
- ✅ Preview das imagens antes da conversão
- ✅ Download individual ou em lote
- ✅ Processamento rápido no lado do cliente
- ✅ Sem necessidade de upload para servidores externos

## 🛠️ Tecnologias

Este projeto foi construído com as seguintes tecnologias:

- **Vue.js 3** - Framework JavaScript progressivo
- **Vite** - Build tool moderna e extremamente rápida
- **SASS/SCSS** - Pré-processador CSS avançado
- **JavaScript ES6+** - Recursos modernos do JavaScript

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos

1. Clone o repositório
```bash
git clone https://github.com/fde95/prismify.git
```

2. Entre na pasta do projeto
```bash
cd prismify
```

3. Instale as dependências
```bash
npm install
# ou
yarn install
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

5. Acesse no navegador
```
http://localhost:5173
```

## 🏗️ Build para Produção

Para gerar a versão otimizada para produção:

```bash
npm run build
# ou
yarn build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 📁 Estrutura do Projeto

```
prismify/
├── public/
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── assets/
│   │   └── icon/
│   ├── components/
│   │   ├── ConverterControls.vue
│   │   ├── Footer.vue
│   │   ├── ImageList.vue
│   │   ├── ImageUploader.vue
│   │   └── PrismaticBurst.vue
│   ├── styles/
│   │   ├── base/
│   │   │   ├── _globals.scss
│   │   │   └── _reset.scss
│   │   ├── components/
│   │   └── main.scss
│   ├── utils/
│   │   ├── imageConverter.js
│   │   └── zipDownloader.js
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Como Usar

1. **Upload de Imagens**: Clique na área de upload ou arraste suas imagens
2. **Selecione o Formato**: Escolha entre WEBP, JPEG ou PNG
3. **Configure a Qualidade**: Ajuste o nível de compressão (para JPEG/WEBP)
4. **Converta**: Clique no botão de conversão
5. **Download**: Baixe individualmente ou todas de uma vez em ZIP

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você tem alguma sugestão para melhorar este projeto:

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


## 👨‍💻 Desenvolvedor

**DevFE - Felipe Espinoza**

Desenvolvedor Front-End apaixonado por criar experiências web modernas e eficientes.

[![GitHub](https://img.shields.io/badge/GitHub-fde95-181717?style=for-the-badge&logo=github)](https://github.com/fde95)
[![Portfolio](https://img.shields.io/badge/Portfolio-DevFE-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://portfolio.devfe.com.br/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-fde95-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/fde95/)

---

<div align="center">
  <p>Desenvolvido com 💜 por Felipe Espinoza</p>
  <p>© 2025 Prismify - Todos os direitos reservados</p>
</div>