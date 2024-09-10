import os
import json
import logging
logging.basicConfig(level=logging.DEBUG)


def handling_sections(self):
    with open('./myenv/data/resumeData.json') as json_data:
        resume_data = json.load(json_data)
        resume_data = resume_data['data']
    pass