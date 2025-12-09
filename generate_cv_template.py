from fpdf import FPDF
from fpdf.enums import XPos, YPos

class EditableCV(FPDF):
    def header(self):
        # Left-aligned logo and name, vertically centered in header bar
        self.set_fill_color(225, 227, 232)
        self.rect(10, 10, 190, 23, 'F')
        logo_w = 16
        logo_h = 16
        logo_y = 13
        logo_x = 18
        self.image("logo.png", logo_x, logo_y, logo_w, logo_h)
        self.set_xy(logo_x + logo_w + 6, logo_y + 2)
        self.set_font("Helvetica", "B", 20)
        self.cell(0, 10, "EMMANUEL KIBET YEGON", 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L")
        # Title under name
        self.set_xy(logo_x + logo_w + 6, logo_y + 12)
        self.set_font("Helvetica", "I", 13)
        self.set_text_color(87, 36, 74)
        self.cell(0, 7, "Software Engineer", 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L")
        self.set_text_color(0, 0, 0)
        # Contact info below header bar, with more vertical space
        self.set_xy(10, 33)
        self.set_fill_color(40, 40, 40)
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "", 11)
        self.cell(
            190, 8,
            "2030, 20200 - Kericho, Kenya | +254746274335 | emmanuelyegon513@gmail.com",
            0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L", fill=True
        )
        self.set_text_color(0, 0, 0)
        # Remove any self.ln() at the end of header to avoid extra vertical space

    def section_title(self, title, y=None, x=None, width=92):
        if y is not None:
            self.set_y(y)
        if x is not None:
            self.set_x(x)
        # Draw hr ONLY above the title, not below
        if x is not None:
            self.section_hr(x, x + width)
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(40, 40, 40)
        self.cell(width, 8, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_text_color(0, 0, 0)

    def section_hr(self, x1, x2, y=None):
        if y is not None:
            self.set_y(y)
        self.set_draw_color(120, 120, 120)
        self.set_line_width(0.6)
        y_line = self.get_y()
        self.line(x1, y_line, x2, y_line)
        # Do not move cursor after hr

    def col_left(self, y):
        # Start left column just below header bar (y=45 is good)
        self.set_xy(10, y)
        self.section_title("PROFESSIONAL SUMMARY", x=10, width=92)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(
            92, 5,
            "I am a passionate and results-driven Software Engineer with a strong foundation in computer science and hands-on experience in full-stack development. I excel at solving real-world challenges through coding, collaborating in remote and freelance projects, and delivering robust solutions for clients and organizations. My commitment to continuous learning and innovation drives me to stay updated with the latest technologies and contribute meaningfully to every team I join.",
            align="J"
        )
        self.ln(3)
        self.section_title("EDUCATION", x=10, width=92)
        self.set_font("Helvetica", "B", 10)
        self.cell(92, 6, "B.Sc. : Computer Science, 2023 - Present", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_font("Helvetica", "", 10)
        self.cell(92, 6, "University of Kabianga - Kericho, Kenya", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(3)
        self.section_title("WEBSITES, PORTFOLIOS, PROFILES", x=10, width=92)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(
            92, 5,
            "- Portfolio: https://jhlievirsmahnu.netlify.app\n"
            "- LinkedIn: linkedin.com/in/emmanuel-yegon-9395912aa\n"
            "- GitHub: github.com/emmanuelyegon",
            align="J"
        )
        self.ln(3)
        self.section_title("HOBBIES", x=10, width=92)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(
            92, 5,
            "- Reading tech blogs\n- Playing chess\n- Hiking and nature walks\n- Participating in hackathons",
            align="J"
        )
        self.ln(3)
        self.section_title("REFEREES", x=10, width=92)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(
            92, 5,
            "Dr. John Kiprono\nLecturer, University of Kabianga\nEmail: jkiprono@kabianga.ac.ke\nPhone: +254712345678",
            align="J"
        )

    def col_right(self, y):
        self.set_y(y)
        self.set_x(108)
        self.section_title("SKILLS", x=108, width=92)
        self.set_x(108)
        self.set_font("Helvetica", "B", 10)
        self.cell(92, 6, "Hard Skills:", new_x=XPos.RIGHT, new_y=YPos.NEXT)
        self.set_x(108)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(
            92, 6,
            "- C, C++, Python, JavaScript, HTML, CSS\n"
            "- React, Node.js, Express, MySQL\n"
            "- Git & GitHub, REST APIs\n"
            "- UI/UX Design (Figma, Adobe XD)\n"
            "- Data Analytics (Pandas, SQL)",
            align="J"
        )
        self.ln(1)
        self.set_x(108)
        self.set_font("Helvetica", "B", 10)
        self.cell(92, 6, "Soft Skills:", new_x=XPos.RIGHT, new_y=YPos.NEXT)
        self.set_x(108)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(
            92, 6,
            "- Critical thinker\n"
            "- Problem solver\n"
            "- Communication & teamwork\n"
            "- Adaptability\n"
            "- Time management",
            align="J"
        )
        self.ln(2)
        self.set_x(108)
        self.section_title("EXPERIENCE", x=108, width=92)
        self.set_x(108)
        self.set_font("Helvetica", "B", 11)
        self.cell(92, 6, "End User Support (Attachment), 2023", new_x=XPos.RIGHT, new_y=YPos.NEXT)
        self.set_x(108)
        self.set_font("Helvetica", "", 10)
        self.cell(92, 6, "Kericho", new_x=XPos.RIGHT, new_y=YPos.NEXT)
        self.set_x(108)
        self.multi_cell(
            92, 6,
            "- Troubleshoot IT hardware/software issues\n"
            "- Assist with network configuration\n"
            "- Provide basic user training",
            align="J"
        )
        self.ln(1)
        self.set_x(108)
        self.set_font("Helvetica", "B", 11)
        self.cell(92, 6, "Remote Developer (Freelance), 2022 - Present", new_x=XPos.RIGHT, new_y=YPos.NEXT)
        self.set_x(108)
        self.set_font("Helvetica", "", 10)
        self.cell(92, 6, "Remote", new_x=XPos.RIGHT, new_y=YPos.NEXT)
        self.set_x(108)
        self.multi_cell(
            92, 6,
            "- Built and deployed web applications for clients\n"
            "- Collaborated with global teams on open source projects\n"
            "- Delivered freelance solutions for small businesses",
            align="J"
        )
        self.ln(1)
        self.set_x(108)
        self.set_font("Helvetica", "B", 11)
        self.cell(92, 6, "Freelance Projects", new_x=XPos.RIGHT, new_y=YPos.NEXT)
        self.set_x(108)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(
            92, 6,
            "- Leave Management System: Full HR solution (React, MySQL, Node.js)\n"
            "- Chat Application: Real-time chat with offline support (Electron)\n"
            "- Portfolio Website: Built with React and deployed on Netlify",
            align="J"
        )
        self.ln(1)
        self.set_x(108)
        self.set_font("Helvetica", "B", 11)
        self.cell(92, 6, "Certifications & Achievements", new_x=XPos.RIGHT, new_y=YPos.NEXT)
        self.set_x(108)
        self.set_font("Helvetica", "", 9)
        self.multi_cell(
            92, 5,
            "- 100DaysOfCode challenge completer\n"
            "- Google Africa Developer Scholarship Participant\n"
            "- Cisco Networking Basics Certification",
            align="J"
        )

    def generate(self, output="E-Y-c_v_fixed.pdf"):
        self.add_page()
        # Draw vertical separator (shorter, only between columns)
        self.set_draw_color(180, 180, 180)
        self.set_line_width(0.8)
        # Place the vertical line and right column rectangle just below the header
        header_bottom = 41  # Adjust this value to match the bottom of your header bar
        self.line(105, header_bottom, 105, self.h - 20)
        self.set_fill_color(255, 255, 255)
        self.rect(108, header_bottom, 92, self.h - header_bottom - 15, 'F')
        # Start columns just below header
        self.col_left(header_bottom)
        self.col_right(header_bottom)
        self.output(output)

if __name__ == "__main__":
    pdf = EditableCV()
    # Use absolute path to ensure file is saved in the project folder
    output_path = r"C:\Users\Window\Desktop\cv\E-Y-c_v2.pdf"
    pdf.generate(output_path)
    print(f"✅ PDF generated successfully at {output_path}")

