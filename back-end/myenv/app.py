from flask import Flask, request, send_file, jsonify, send_from_directory, make_response
from flask_cors import CORS
from src.template_manager import TemplateManager
import subprocess
import json
import os
import logging 
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    deez = "munch"
    x = 5
    y = 13
    z = x + y
    return 'Hello, World!'

#  save initial personal details, applied globally to resume
@app.route('/api/save-personal-data', methods=['POST'])
def save_data():
    try:
        data = request.json.get('data')
        file_path = os.path.join(os.path.dirname(__file__), './data', 'personalData.json')
        
        with open(file_path, 'w') as file:
            json.dump({'data': data}, file, indent=2)
        
        return 'File saved successfully', 200
    
    except Exception as error:
        print(f'Error writing file: {error}')
        return 'Error saving file', 500
    
# save resume content
@app.route('/api/save-resume-data', methods=['POST'])
def save_resume_data():
    try:
        data = request.json.get('data')
        file_path = os.path.join(os.path.dirname(__file__), './data', 'finalResumeData.json')
        
        with open(file_path, 'w') as file:
            json.dump({'data': data}, file, indent=2)
    
        return 'File saved successfully', 200
    
    except Exception as error:
        print(f'Error writing file: {error}')
        return 'Error saving file', 500

# finally, generate pdf button
@app.route('/api/generate-pdf', methods=['POST'])
def generate_pdf():
    try:
        template_name = request.json.get('data')

        #  initiate the template manager object
        manage_template = TemplateManager(template_name)

        # check if user requested template exists or not
        # templates_list = manage_template.templates
        # if template_name not in templates_list:
        #     return 'Requested template is not present', 502
        
        # segment check for requested template
        # segments_list = curr_template.list_segments_in_templates(data)
        # to-do: check from the data folder, in resumeData.json and verify each section.
        # can account for the base section, or any new section present
        # present_segment = [f for f in segments_list if f == data]

        # we initialize the document with the personal information obtained.
        manage_template.exec()

        # convert latex file (.tex file) to pdf and save locally. 
        # save it in the myenv folder, for easy access by the app.py main file.
        miktex_bin_path = r"C:\Users\adity\AppData\Local\Programs\MiKTeX\miktex\bin\x64"
        os.environ["PATH"] += os.pathsep + miktex_bin_path
        current_dir = os.path.dirname(os.path.abspath(__file__))
        subprocess.run(["pdflatex", '-output-directory', current_dir, "./myenv/data/resume-content.tex"], check=True)
        print("PDF generated successfully.")
        
        # logging.debug(os.getcwd())
        pdf_path = os.path.join(os.getcwd(), 'myenv', 'resume-content.pdf')
        response = make_response(send_file(pdf_path, as_attachment=True))
        response.headers['Content-Disposition'] = 'attachment; filename=resume-content.pdf'
        return response, 200
        return "Success", 200
    
    except ValueError as ve:
        logging.error(f"Unexpected error: {ve}")
        return f"Correct value not received, {ve}", 400
    except RuntimeError as re:
        logging.error(f"Unexpected error: {re}")
        return f"Could not execute correctly, {re}", 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
    

if __name__ == '__main__':
    app.run(use_reloader=True, debug=True, port=5000)
