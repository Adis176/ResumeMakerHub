import subprocess
import os
import sys
import json
import importlib
import logging
logging.basicConfig(level=logging.DEBUG)
from .initiate import initiateLatexDoc
# from .sections import handling_sections

class TemplateManager:
    def __init__(self, template_name):      
        self.resume_path = './myenv/data/resume-content.tex'
        self.name = template_name
        self.templates = self.list_templates()
        if self.name in self.templates:
            # logging.debug("template name present")
            module_name = f"src.templates.{self.name}"
            template_module = importlib.import_module(module_name)
            # logging.debug("template module")
            # logging.debug(template_module)
            template_class = getattr(template_module, self.name.capitalize())
            self.template_instance = template_class()
        else:
            logging.error(f"Error in load instance method")
            raise ValueError("Did not find template name: {self.name}")
        pass

    def list_templates(self):
        try:
            return [f for f in os.listdir('./myenv/src/templates')]
        except Exception as e:
            raise RuntimeError("could not fetch templates, {e}")
    
    # write the obtained content in 'w' format, so it is overwritten. Thus marks the start of a new document
    def initiate(self):
        try:
            initial_content = initiateLatexDoc()
            with open(self.resume_path, 'w') as f:
                    f.write(initial_content)
            pass
        except Exception as e:
            logging.error(f"Error in initiate method: {e}")
            raise RuntimeError("Could not initiate document with personal details: ", e)
    
    def handle_sections(self):
        if self.template_instance:
            self.template_instance.handling_sections()

    # convert given string to raw. 
    def convert_to_raw(self, s):
        return fr"{s}"
    
    # jsut get the object, and get appropriate raw content to be substituted
    def parse_text(self, data):
        if data['format'] != "":
            if data['format'] == data['main']:
                return self.convert_to_raw(data['format'])
            curr_text = self.convert_to_raw(data['format'])
            curr_text = curr_text.replace('<p>',  r"""""")
            curr_text = curr_text.replace('</p>', r"""""")
            curr_text = curr_text.replace('<em>', r"""\textit{""")
            curr_text = curr_text.replace('</em>', r"""}""")
            curr_text = curr_text.replace('<strong>', r"""\textbf{""")
            curr_text = curr_text.replace('</strong>', r"""}""")
            curr_text = curr_text.replace('<u>', r"""\underline{""")
            curr_text = curr_text.replace('</u>', r"""}""")
            return curr_text
            pass

        elif data['main'] != "":
            return self.convert_to_raw(data['main'])
        
        return r""""""
        pass

    # append as to not erase previous content
    def saving(self):
        try:
            with open(self.resume_path, 'a') as f:
                f.write(r"""
\end{document}
                """)
        except Exception as e:
            logging.error(f"Error in saving method: {e}")
            raise RuntimeError(f"Could not save document: {e}")

    # the whole execution of making of the .tex file done here.
    # initiate to get all personal details and write them.
    def exec(self):
        try:
            self.initiate()
            self.handle_sections()
            self.saving()
        except Exception as e:
            # Handle the exception or log it
            logging.error(f"Error in exec method: {e}")
            raise