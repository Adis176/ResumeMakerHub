import os
import json

from ...template_manager import TemplateManager

from .certificates import Certificate
from .education import Education
from .experience import Experience
from .expertise import Expertise
from .language import Language
from .name import Name
from .profile import Profile
from .projects import Project
from .responsibilities import Responsibilities
from .skills import Skills
from .objective import Objective

import logging
logging.basicConfig(level=logging.DEBUG)

class Ats(TemplateManager):
    def __init__(self) -> None:
        logging.debug("Ats class initialized")
        self.resume_path = './myenv/data/resume-content.tex'
        pass
    
    def handling_sections(self):
        logging.debug("handling started for section: ats")
        with open('./myenv/data/finalResumeData.json') as json_data:
            resume_data = json.load(json_data)
            resume_data = resume_data['data']
            logging.debug("handling sections")
            logging.debug(resume_data[0])
            initial_content = r""""""

            for section in resume_data:
                if section['segment_title']=="objective":
                    obj_section = section['items']
                    for attribute in obj_section:
                        obj = Objective(attribute)
                        objective_text = obj.update()
                        initial_content = initial_content + objective_text
                
                if section['segment_title']=="education":
                    edu_section = section['items']
                    initial_content = initial_content + r"""

% EDUCATION SECTION
\sectionHeading{Education}"""
                    for attribute in edu_section:
                        edu = Education(attribute)
                        edu_text = edu.update()
                        initial_content = initial_content + edu_text
            
                if section['segment_title']=="work-experience":
                    work_section = section['items']
                    initial_content = initial_content + r"""

% WORK EXPERIENCE SECTION
\sectionHeading{Work Experience}"""
                    for attribute in work_section:
                        work = Experience(attribute)
                        work_text = work.update()
                        initial_content = initial_content + work_text
            

                if section['segment_title']=="projects":
                    proj_section = section['items']
                    initial_content = initial_content + r"""

% PROJECTS
\sectionHeading{Projects}"""
                    for attribute in proj_section:
                        proj = Project(attribute)
                        proj_text = proj.update()
                        initial_content = initial_content + proj_text


                if section['segment_title']=="certificates":
                    certificate_section = section['items']
                    initial_content = initial_content + r"""

% CERTIFICATES
\sectionHeading{Certificates}"""
                    for attribute in certificate_section:
                        certificate = Certificate(attribute)
                        certificate_text = certificate.update()
                        initial_content = initial_content + certificate_text


                if section['segment_title']=="skills":
                    skill_section = section['items']
                    initial_content = initial_content + r"""

% SKILLS
\sectionHeading{Skills}"""
                    for attribute in skill_section:
                        skill = Skills(attribute)
                        skill_text = skill.update()
                        initial_content = initial_content + skill_text
                

                if section['segment_title']=="languages":
                    lang_section = section['items']
                    initial_content = initial_content + r"""

% LANGUAGES
\sectionHeading{Languages}"""
                    for attribute in lang_section:
                        lang = Language(attribute)
                        lang_text = lang.update()
                        initial_content = initial_content + lang_text

            with open(self.resume_path, 'a') as f:
                    f.write(initial_content)
        pass
    pass