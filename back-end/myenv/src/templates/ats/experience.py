import logging
logging.basicConfig(role=logging.DEBUG)
from ...template_manager import TemplateManager

class Experience(TemplateManager):
    def __init__(self, data):
        self.data = data
        pass

    def update(self):
        experience_text = r""""""
        logging.debug("We are in updte of experience")
        logging.debug(self.data)
        logging.debug(self.data['organization']['main'], self.data['organization']['format'])
        if self.data['organization']['main'] != "" or self.data['organization']['format'] != "":
            experience_main = r"""
\setlength{\leftmargin}{0em}\resumeSubsection{{organization}}{{duration}}{{role}}{{location}}"""
            organization_parsed = super(Experience, self).parse_text(self.data['organization'])
            duration_parsed = super(Experience, self).parse_text(self.data['duration'])
            role_parsed = super(Experience, self).parse_text(self.data['role'])
            location_parsed = super(Experience, self).parse_text(self.data['location'])
            experience_main = experience_main.replace('{organization}', organization_parsed)
            experience_main = experience_main.replace('{duration}', duration_parsed)
            experience_main = experience_main.replace('{role}', role_parsed)
            experience_main = experience_main.replace('{location}', location_parsed)
            experience_text = experience_text + experience_main

            # check for features now
            if (len(self.data['features']['main'])>0 and self.data['features']['main']!="") or (len(self.data['features']['format'])>0 and self.data['features']['format']!=""):
                experience_feature = r"""
\begin{itemize}"""                 
                self.added = False
                for i in range(len(self.data['features']['format'])):
                    curr_data = {
                        'main': self.data['features']['main'][i],
                        'format': self.data['features']['format'][i]
                    }
                    curr_feature = super(Experience, self).parse_text(curr_data)
                    if len(curr_feature)>0 and curr_feature!=r"""""":
                        self.added = True
                        curr_feature_content = r"""
\vspace{-6pt}
\item \hspace{-2.5pt} {feature_content}""".replace('{feature_content}', curr_feature)
                        experience_feature = experience_feature + curr_feature_content
                experience_feature = experience_feature + r"""\end{itemize}
"""
                if self.added:
                    experience_text = experience_text + experience_feature

        return experience_text
