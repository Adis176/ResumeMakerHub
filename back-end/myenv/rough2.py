import subprocess
import os

def create_latex_document(filename, content):
    """Create a LaTeX document."""
    with open(filename, 'w') as f:
        f.write(content)

def compile_latex_document(latex_file):
    """Compile a LaTeX document using MiKTeX."""
    try:
        result = subprocess.run(['pdflatex', latex_file], capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Error occurred:\n{result.stderr}")
        else:
            print(f"Compilation successful:\n{result.stdout}")
    except FileNotFoundError:
        print("pdflatex command not found. Ensure MiKTeX is installed and in PATH.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

def main():
    # Define the LaTeX content
    latex_content = """
    \\documentclass{article}
    \\begin{document}
    Hello, world!
    \\end{document}
    """
    
    # Define file names
    latex_file = 'example.tex'
    pdf_file = 'example.pdf'
    
    # Create LaTeX document
    create_latex_document(latex_file, latex_content)
    
    # Compile the LaTeX document
    compile_latex_document(latex_file)
    
    # Check if PDF was created
    if os.path.exists(pdf_file):
        print(f"PDF file created: {pdf_file}")
    else:
        print("PDF file was not created.")

if __name__ == "__main__":
    main()
