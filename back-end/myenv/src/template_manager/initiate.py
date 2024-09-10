import json
import logging

logging.basicConfig(level=logging.DEBUG)


def getSingleLine(multi_string) -> str:
    return multi_string.replace('\n', ' ')

def initiateLatexDoc():
    logging.debug("Initial content being parsed")
    # load data
    with open('./myenv/data/personalData.json') as json_data:
        personal_data = json.load(json_data)
        personal_data = personal_data['data']
        # logging.debug("The DS obtained is of type")
        # logging.debug(type(personal_data))
        initial_content = r"""
\documentclass[{size}pt, {type}]{article}
% Ensure that generate pdf is machine readable/ATS parsable:
\ifPDFTeX
    \input{glyphtounicode}
    \pdfgentounicode=1
    \usepackage[T1]{fontenc}
    \usepackage[utf8]{inputenc}
    \usepackage{lmodern}
\fi
"""
        if personal_data['size'] == "":
            personal_data['size'] = '11'
        initial_content = initial_content.replace('{size}', personal_data['size'])

        if personal_data['type'] == "":
            personal_data['type'] = 'letterpaper'
        initial_content = initial_content.replace('{type}', personal_data['type'])

        margin_text = r"""
% package for setting margins
\usepackage [
ignoreheadfoot, 
left={ml}in, right={mr}in, top={mt}in, bottom={mb}in]{geometry}
% icons package
\usepackage{fontawesome5}
% ordered list
\usepackage{enumitem}
% to format hyperlinks
\usepackage{hyperref}
% Required for ifthenelse statements
\usepackage{xifthen} 
% package to set 0 margin for paragraph, so no pre-defined indent
\usepackage[parfill]{parskip}
% package for tabular content
\usepackage{tabularx}
% used to set proper left margins for items.
\setlist[itemize]{leftmargin=4.6mm}

\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    filecolor=magenta,      
    urlcolor=blue,
}
% Save the original \href command in a new command
\let\hrefWithoutArrow\href

% Optionally redefine \hrefWithoutArrow to customize it
% For example, redefine it to not show the arrow:
\renewcommand{\hrefWithoutArrow}[2]{%
    \href{#1}{#2}%
}

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

% for each section heading

\newcommand{\sectionHeading}[1]{
    \MakeUppercase{\textbf{#1}}
    \vspace{4pt}
    \hrule{}
    \vspace{-2pt}
}

\newcommand{\resumeSubheading}[4]{
    \noindent % Prevent indentation
    \ifthenelse{\isempty{#1}}%
        {}% if #1 is empty
        {\begin{tabularx}{\textwidth}{@{}X@{\hspace{10pt}}r@{}}
            \large{\textbf{#1}} & #2 \\
        \end{tabularx}}
    \ifthenelse{\isempty{#3}}%
        {}% if #1 is empty
        {\begin{tabularx}{\textwidth}{@{}X@{\hspace{10pt}}r@{}}
            #3 & \Small{\textit{#4}} \\
        \end{tabularx}}
}

\newcommand{\resumeSubsection}[4]{
    \noindent % Prevent indentation
    \ifthenelse{\isempty{#1}}%
        {\vspace{-10pt}}% if #1 is empty
        {\begin{tabularx}{\textwidth}{@{}X@{\hspace{10pt}}r@{}}
            \large{\textbf{#1}} & #2 \\
        \end{tabularx}}
    \ifthenelse{\isempty{#3}}%
        {\vspace{-10pt}}% if #1 is empty
        {\begin{tabularx}{\textwidth}{@{}X@{\hspace{10pt}}r@{}}
            #3 & #4 \\
        \end{tabularx}}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubsection}[2]{
    \noindent % Prevent indentation
    \ifthenelse{\isempty{#1}}%
        {\vspace{-22pt}}% if #1 is empty
        {\begin{tabularx}{\textwidth}{@{}X@{\hspace{10pt}}r@{}}
            \large{\textbf{#1}} & #2 \\
        \end{tabularx}}
}




\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}

\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}

\newcommand{\resumeItemListStart}{\begin{itemize}}

\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

\newcommand{\resumeDescription}[1]{
    \textit{#1}
}

"""
        margin_text = margin_text.replace('{ml}', personal_data['ml'])
        margin_text = margin_text.replace('{mr}', personal_data['mr'])
        margin_text = margin_text.replace('{mt}', personal_data['mt'])
        margin_text = margin_text.replace('{mb}', personal_data['mb'])
        initial_content = initial_content + margin_text

        name_text = r"""
\begin{document}
\begin{center}
\textbf{\Huge \scshape {{name}} }
\end{center}
"""
        name_text = name_text.replace('{{name}}', personal_data['name'])
        initial_content = initial_content + name_text

        prefix = "zdet"
        prefix_under = "zdetail"
        detail = False
        detail_text = r"""
"""
        textbar = r"""
\hspace{2pt} \textbar{} \hspace{2pt}"""
        for key in personal_data:
            if(key.startswith(prefix)):
                detail = True
        
        if detail:
            initial_content = initial_content + r"""
\begin{center}
"""
        if personal_data['zdetail-email'] != "":
            temp_attribute = r""""""
            if personal_data['icon']:
                temp_attribute = temp_attribute + r"""\faEnvelopeSquare \hspace{5pt}"""
            temp_attribute = temp_attribute + r"""
{\href{mailto:{{email}}}{{{email}}}}

"""
            temp_attribute = temp_attribute.replace('{{email}}', personal_data['zdetail-email'])
            if detail_text.strip():
                detail_text = detail_text + textbar
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute


        if personal_data['zdet-number'] != "":
            temp_attribute = r""""""
            if personal_data['icon']:
                temp_attribute = temp_attribute + r""" \faPhone \hspace{5pt}"""
            temp_attribute = temp_attribute + r"""
{{number}}

"""
            temp_attribute = temp_attribute.replace('{{number}}', personal_data['zdet-number'])
            if detail_text.strip():
                detail_text = detail_text + textbar
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute


        if personal_data['zdetail-portfolio'] != "":
            temp_attribute = r""""""
            if personal_data['icon']:
                temp_attribute = temp_attribute + r"""\faLaptopCode \hspace{5pt}"""
            temp_attribute = temp_attribute + r"""
{\href{{{port}}}{{{port}}}}
"""
            temp_attribute = temp_attribute.replace('{{port}}', personal_data['zdetail-portfolio'])
            if detail_text.strip():
                detail_text = detail_text + textbar
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute



        if personal_data['zdetail-linkedin'] != "":
            temp_attribute = r""""""
            if personal_data['icon']:
                temp_attribute = temp_attribute + r"""\faLinkedinIn \hspace{5pt}"""
            temp_attribute = temp_attribute + r"""
{\href{{{link}}}{{{link}}}}
"""
            temp_attribute = temp_attribute.replace('{{link}}', personal_data['zdetail-linkedin'])
            if detail_text.strip():
                detail_text = detail_text + textbar
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute


        
        if personal_data['zdetail-instagram'] != "":
            temp_attribute = r""""""
            if personal_data['icon']:
                temp_attribute = temp_attribute + r"""\faInstagram \hspace{5pt}"""
            temp_attribute = temp_attribute + r"""
{\href{{{insta}}}{{{insta}}}}
"""
            temp_attribute = temp_attribute.replace('{{insta}}', personal_data['zdetail-instagram'])
            if detail_text.strip():
                detail_text = detail_text + textbar
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute



        if personal_data['zdetail-facebook'] != "":
            temp_attribute = r""""""
            if personal_data['icon']:
                temp_attribute = temp_attribute + r"""\faFacebook \hspace{5pt}"""
            temp_attribute = temp_attribute + r"""
{\href{{{fb}}}{{{fb}}}}
"""
            temp_attribute = temp_attribute.replace('{{fb}}', personal_data['zdetail-facebook'])
            if detail_text.strip():
                detail_text = detail_text + textbar
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute


        if personal_data['zdetail-git'] != "":
            temp_attribute = r""""""
            if personal_data['icon']:
                temp_attribute = temp_attribute + r"""\faGithub \hspace{5pt}"""
            temp_attribute = temp_attribute + r"""
{\href{{{git}}}{{{git}}}}
"""
            temp_attribute = temp_attribute.replace('{{git}}', personal_data['zdetail-git'])
            if detail_text.strip():
                detail_text = detail_text + textbar
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute
        
        if personal_data['zdet-address'] != "":
            temp_attribute = r""""""
            if personal_data['icon']:
                temp_attribute = temp_attribute + r"""\faAddressBook  \hspace{5pt}"""
            temp_attribute = temp_attribute + r"""
{address}
"""
            temp_attribute = temp_attribute.replace('{address}', personal_data['zdet-address'])
            if detail_text.strip():
                detail_text = detail_text + textbar
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute

        
        if personal_data['zdet-role'] != "":
            temp_attribute = r""""""
            if personal_data['icon']:
                temp_attribute = temp_attribute + r"""\faDiagnoses  \hspace{5pt}"""
            temp_attribute = temp_attribute + r"""
{role}
"""
            temp_attribute = temp_attribute.replace('{role}', personal_data['zdet-role'])
            if detail_text.strip():
                detail_text = detail_text + textbar
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute

        
        if personal_data['summary'] != "":
            temp_attribute = r""""""
            temp_attribute = temp_attribute + r"""
\vspace{4pt}
{summary}
"""
            temp_attribute = temp_attribute.replace('{summary}', personal_data['summary'])
            temp_attribute = getSingleLine(temp_attribute)
            detail_text = detail_text + temp_attribute

        
#         for key in personal_data:
#             if key.startswith(prefix) and personal_data[key]!="":
#                 if(detail_text.strip):
#                     detail_text = detail_text + textbar
#                 else:
#                     detail_text = detail_text + r"""    
# \begin{header}
# """
#                 curr_attribute = r""""""
#                 if(key.startswith(prefix_under)):
#                     curr_attribute += r"""
# \href{""" + personal_data[key] + r"""}{
# """
#                 curr_attribute = curr_attribute + r"""{key}"""
#                 if(key.startswith(prefix_under)):
#                     curr_attribute = curr_attribute + r"""
# }
# """
#                 curr_attribute = curr_attribute.replace('{key}', personal_data[key])
#                 logging.debug(curr_attribute)
#                 detail_text = detail_text + curr_attribute


# end the region, and leave some space at the end.
        if detail_text != r"""""":
            detail_text = detail_text + r"""
\end{center}
"""
            initial_content = initial_content + r"""\vspace{5pt}"""
            initial_content = initial_content + detail_text

        return initial_content

# # Test the function
# result = initiateLatexDoc()
# print(result)