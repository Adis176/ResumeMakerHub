import logging
logging.basicConfig(level=logging.DEBUG)
from ...template_manager import TemplateManager

class Objective(TemplateManager):
    def __init__(self, data):
        self.data = data
        pass

    def update(self):
        objective_text = r""""""
        # logging.debug("We are in updte of objective")
        # logging.debug(self.data)
        # logging.debug(self.data['attribute1']['main'])
        if self.data['attribute1']['main'] != "" or self.data['attribute1']['format'] != "":
            objective_content = r"""
\sectionHeading{Objective}"""
            objective_text = objective_text + objective_content
            objective_parsed = super(Objective, self).parse_text(self.data['attribute1'])
            objective_main = r"""
\setlength{\leftmargin}{0em}
\resumeDescription{{obj}}""".replace('{obj}', objective_parsed)
            objective_text = objective_text + objective_main
        return objective_text
