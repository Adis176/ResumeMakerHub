import os
import subprocess

# Set the path to include the directory where pdflatex is installed
miktex_bin_path = r"C:\Users\adity\AppData\Local\Programs\MiKTeX\miktex\bin\x64"
os.environ["PATH"] += os.pathsep + miktex_bin_path

# Your LaTeX source
latex_source = r'''
\documentclass{article}
\begin{document}
Hello, LaTeX!
\end{document}
'''

# Write the LaTeX source to a .tex file
with open('example.tex', 'w') as f:
    f.write(latex_source)

# Compile the .tex file to a .pdf using pdflatex
subprocess.run(["pdflatex", "example.tex"], check=True)

print("PDF generated successfully.")
