To use the Python PDF generator, you need Python and pip installed.

1. Download and install Python from https://www.python.org/downloads/
   - Make sure to check "Add Python to PATH" during installation.

2. After installation, open a new Command Prompt and run:
   python --version
   pip --version

   Both should print a version number.

3. To install the required package, run:
   python -m pip install fpdf2

# If you see "ModuleNotFoundError: No module named 'fpdf'", it means fpdf2 is not installed.
# Run the above command to install it, then try again:
   python generate_cv_template.py

Now you can run your Python script as:
   python generate_cv_template.py

The generated PDF file (cv_template.pdf) will be saved in the same directory as your script:
   c:\Users\Window\Desktop\cv\cv_template.pdf

You can open this file with any PDF viewer after running the script.
