import logging
logging.basicConfig(details=logging.DEBUG)
from ...template_manager import TemplateManager

class Certificate(TemplateManager):
    def __init__(self, data):
        self.data = data
        pass

    def update(self):
        certificate_text = r""""""
        logging.debug("We are in updte of certificate")
        logging.debug(self.data)
        logging.debug(self.data['title']['main'], self.data['title']['format'])
        if self.data['title']['main'] != "" or self.data['title']['format'] != "":
            certificate_main = r"""
\setlength{\leftmargin}{0em}
\resumeSubSubsection{{title}}{{details}}"""
            title_parsed = super(Certificate, self).parse_text(self.data['title'])
            details_parsed = super(Certificate, self).parse_text(self.data['details'])
            certificate_main = certificate_main.replace('{title}', title_parsed)
            certificate_main = certificate_main.replace('{details}', details_parsed)
            certificate_text = certificate_text + certificate_main

            # check for features now
            if (len(self.data['features']['main'])>0 and self.data['features']['main']!="") or (len(self.data['features']['format'])>0 and self.data['features']['format']!=""):
                certificate_feature = r"""
\begin{itemize}"""                 
                self.added = False
                for i in range(len(self.data['features']['format'])):
                    curr_data = {
                        'main': self.data['features']['main'][i],
                        'format': self.data['features']['format'][i]
                    }
                    curr_feature = super(Certificate, self).parse_text(curr_data)
                    if len(curr_feature)>0 and curr_feature!=r"""""":
                        self.added = True
                        curr_feature_content = r"""
\vspace{-6pt}
\item \hspace{-2.5pt} {feature_content}""".replace('{feature_content}', curr_feature)
                        certificate_feature = certificate_feature + curr_feature_content
                certificate_feature = certificate_feature + r"""\end{itemize}
"""
                if self.added:
                    certificate_text = certificate_text + certificate_feature

        return certificate_text
