import logging
logging.basicConfig(details=logging.DEBUG)
from ...template_manager import TemplateManager

class Language(TemplateManager):
    def __init__(self, data):
        self.data = data
        pass

    def update(self):
        lang_text = r""""""
        logging.debug("We are in updte of lang")
        logging.debug(self.data)
        logging.debug(self.data['title']['main'], self.data['title']['format'])
        if self.data['title']['main'] != "" or self.data['title']['format'] != "":
            lang_main = r"""
\setlength{\leftmargin}{0em}
\resumeSubSubsection{{title}}{}"""
            title_parsed = super(Language, self).parse_text(self.data['title'])
            lang_main = lang_main.replace('{title}', title_parsed)
            lang_text = lang_text + lang_main

            # check for features now
            if (len(self.data['features']['main'])>0 and self.data['features']['main']!="") or (len(self.data['features']['format'])>0 and self.data['features']['format']!=""):
                lang_feature = r"""
\begin{itemize}"""                 
                self.added = False
                for i in range(len(self.data['features']['format'])):
                    curr_data = {
                        'main': self.data['features']['main'][i],
                        'format': self.data['features']['format'][i]
                    }
                    curr_feature = super(Language, self).parse_text(curr_data)
                    if len(curr_feature)>0 and curr_feature!=r"""""":
                        self.added = True
                        curr_feature_content = r"""
\vspace{-6pt}
\item \hspace{-2.5pt} {feature_content}""".replace('{feature_content}', curr_feature)
                        lang_feature = lang_feature + curr_feature_content
                lang_feature = lang_feature + r"""\end{itemize}
"""
                if self.added:
                    lang_text = lang_text + lang_feature

        return lang_text
