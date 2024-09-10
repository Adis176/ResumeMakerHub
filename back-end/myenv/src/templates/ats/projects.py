import logging
logging.basicConfig(details=logging.DEBUG)
from ...template_manager import TemplateManager

class Project(TemplateManager):
    def __init__(self, data):
        self.data = data
        pass

    def update(self):
        proj_text = r""""""
        logging.debug("We are in updte of proj")
        logging.debug(self.data)
        logging.debug(self.data['title']['main'], self.data['title']['format'])
        if self.data['title']['main'] != "" or self.data['title']['format'] != "":
            proj_main = r"""
\setlength{\leftmargin}{0em}
\resumeSubsection{{title}}{{duration}}{{details}}{{ref}}"""
            title_parsed = super(Project, self).parse_text(self.data['title'])
            duration_parsed = super(Project, self).parse_text(self.data['duration'])
            details_parsed = super(Project, self).parse_text(self.data['details'])
            ref_parsed = super(Project, self).parse_text(self.data['ref'])
            proj_main = proj_main.replace('{title}', title_parsed)
            proj_main = proj_main.replace('{duration}', duration_parsed)
            proj_main = proj_main.replace('{details}', details_parsed)
            proj_main = proj_main.replace('{ref}', ref_parsed)
            proj_text = proj_text + proj_main

            # check for features now
            if (len(self.data['features']['main'])>0 and self.data['features']['main']!="") or (len(self.data['features']['format'])>0 and self.data['features']['format']!=""):
                proj_feature = r"""
\begin{itemize}"""                 
                self.added = False
                for i in range(len(self.data['features']['format'])):
                    curr_data = {
                        'main': self.data['features']['main'][i],
                        'format': self.data['features']['format'][i]
                    }
                    curr_feature = super(Project, self).parse_text(curr_data)
                    if len(curr_feature)>0 and curr_feature!=r"""""":
                        self.added = True
                        curr_feature_content = r"""
\vspace{-6pt}
\item \hspace{-2.5pt} {feature_content}""".replace('{feature_content}', curr_feature)
                        proj_feature = proj_feature + curr_feature_content
                proj_feature = proj_feature + r"""\end{itemize}
"""
                if self.added:
                    proj_text = proj_text + proj_feature

        return proj_text
