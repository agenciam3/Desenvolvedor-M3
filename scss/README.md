

# Documentação

##### Este é um boiletPlate usando o [Padrão de arquitetura 7-1](http://sass-guidelin.es/#architecture) e seguindo as [convenções do Sass](http://sass-guidelin.es).

### O Padrão 7-1

O padrão de arquitetura de pastas 7-1 para Sass pensando por Hugo Giraude basicamente tem arquivos parciais em 7 diretórios, e um arquivo no diretório raiz(normalmente nomeado main.scss), responsável por importar todos os outros arquivos parciais para serem compilados em um único arquivo CSS. 


          sass/
          │
          ├── abstracts/ (or utilities/)
          |   ├── _variables.scss    // Sass Variaveis 
          |   ├── _functions.scss    // Sass Functions
          |   ├── _mixins.scss       // Sass Mixins
          |
          ├── base/
          |   ├── _reset.scss        // Reset/normalize
          |   ├── _typography.scss   // Regras de tipografia 
          |
          ├── components/ (or modules/)
          |   ├── _buttons.scss      // Buttons
          |   ├── _carousel.scss     // Carousel
          |   ├── _slider.scss       // Slider
          |
          ├── layout/
          |   ├── _navigation.scss   // Navigation
          |   ├── _grid.scss         // Grid system
          |   ├── _header.scss       // Header
          |   ├── _footer.scss       // Footer
          |   ├── _sidebar.scss      // Sidebar
          |   ├── _forms.scss        // Formularios
          |
          ├── pages/
          |   ├── _home.scss         // styles especificos da pagina Home
          |   ├── _about.scss        // styles especificos da About
          |   ├── _contact.scss      // styles especificos da Contact
          |
          ├── themes/
          |   ├── _theme.scss        // Default theme
          |   ├── _admin.scss        // Admin theme
          |
          ├── vendors/
          |   ├── _bootstrap.scss    // Bootstrap
          |   ├── _jquery-ui.scss    // jQuery UI
          |
          `– main.scss              // Main Sass file

**Base**: Contém os arquivos de resets, variáveis, mixins e qualquer classe utilitária. 
**Layout**: Contém todo css que lida com o layout, exemplo container ou qualquer sistema de grid.
**Components**: Reutilizáveis, como botões, navbars, cards e etc...
**Main**: deve contém APENAS os imports dos arquivos acima.

**Abstracts (or utilities)**: Contém Sass tools, helpers, variáveis, funções, mixins e outros arquivos de config.
Esses arquivos são para os helpers que não produzem nenhum output e nenhum css quando compilados.

**Base**: Contém os códigos boilerplate para o projeto. Incluindo styles padrão como reset e regras de tipografia.
Muito usados por todo o projeto.

**Components (or modules)**: Contém todo os seus styles para botões, carousels, sliders, e componentes similares (pense widgets).
Seu projeto normalmente vai contém uma punhado de componentes - já que o site/app deve ser composto por pequenos módulos.

**Layout**: Contém todos styles envolvidos com o layout do seu projeto.
     Como styles para o header, footer, navigation e o sistema grid.

**Pages**: Qualquer style especifico de uma página individual deve estar aqui.
Por exemplo é muito incomum para a página inicial do seu site contém um style que nenhuma outra pagina recebe.

**Themes**: Este não é muito usado na maioria dos projetos. Poderia contém arquivos de projeto com temas específicos.
Por exemplo se alguma sessão do seu site alterna o color schemes.

**Vendors**: Contém qualquer código de terceiros de alguma biblioteca externa ou framework - como por exemplo, Normalize, Bootstrap, JQueryUI, e etc.
Apesar de sempre ter a necessidade de reescrever um código de terceiro. Se for necessário, é uma boa pratica criar outra pasta chamada vendors-extensions/ e depois nomeie qualquer arquivo de acordo com o arquivo de terceiro a ser reescrito.
O arquivo filevendors-extensions;_boostrap.scss deveria contém todo o código que você subscrever do bootstrap - rescrever o arquivo de terceiros diretamente, normalmente não é uma boa ideia.


     Main.scss:
          Este arquivo deve conter apenas os seus imports! Por exemplo...

                    @import 'abstracts/variables';
                    @import 'abstracts/functions';
                    @import 'abstracts/mixins';

                    @import 'vendors/bootstrap';
                    @import 'vendors/jquery-ui';

                    @import 'base/reset';
                    @import 'base/typography';

                    @import 'layout/navigation';
                    @import 'layout/grid';
                    @import 'layout/header';
                    @import 'layout/footer';
                    @import 'layout/sidebar';
                    @import 'layout/forms';

                    @import 'components/buttons';
                    @import 'components/carousel';
                    @import 'components/slider';

                    @import 'pages/home';
                    @import 'pages/about';
                    @import 'pages/contact';

                    @import 'themes/theme';
                    @import 'themes/admin';

Não existe a necessidade de incluir o _ ou extensão .scss quando importando.
