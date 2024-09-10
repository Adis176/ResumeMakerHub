import logging
logging.basicConfig(level=logging.DEBUG)
from ...template_manager import TemplateManager

class Education(TemplateManager):
    def __init__(self, data):
        self.data = data
        pass

    def update(self):
        education_text = r""""""
        logging.debug("We are in updte of education")
        logging.debug(self.data)
        logging.debug(self.data['institute']['main'], self.data['institute']['format'])
        if self.data['institute']['main'] != "" or self.data['institute']['format'] != "":
            education_main = r"""
\setlength{\leftmargin}{0em}
\resumeSubheading{{institute}}{{duration}}{{level}}{{grade}}"""
            institute_parsed = super(Education, self).parse_text(self.data['institute'])
            duration_parsed = super(Education, self).parse_text(self.data['duration'])
            level_parsed = super(Education, self).parse_text(self.data['level'])
            grade_parsed = super(Education, self).parse_text(self.data['grade'])
            education_main = education_main.replace('{institute}', institute_parsed)
            education_main = education_main.replace('{duration}', duration_parsed)
            education_main = education_main.replace('{level}', level_parsed)
            education_main = education_main.replace('{grade}', grade_parsed)
            education_text = education_text + education_main

            # check for features now
            if (len(self.data['features']['main'])>0 and self.data['features']['main']!="") or (len(self.data['features']['format'])>0 and self.data['features']['format']!=""):
                education_feature = r"""
\begin{itemize}"""                 
                self.added = False
                for i in range(len(self.data['features']['format'])):
                    curr_data = {
                        'main': self.data['features']['main'][i],
                        'format': self.data['features']['format'][i]
                    }
                    curr_feature = super(Education, self).parse_text(curr_data)
                    if len(curr_feature)>0 and curr_feature!=r"""""":
                        self.added = True
                        curr_feature_content = r"""
\vspace{-6pt}
\item \hspace{-2.5pt} {feature_content}""".replace('{feature_content}', curr_feature)
                        education_feature = education_feature + curr_feature_content
                education_feature = education_feature + r"""\end{itemize}
"""
                if self.added:
                    education_text = education_text + education_feature

        return education_text
