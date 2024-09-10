from latex import build_pdf

latex_source = r"""
\documentclass{article}
\begin{document}
Hello, World!
\end{document}
"""

pdf = build_pdf(latex_source)
pdf.save_to('output.pdf')