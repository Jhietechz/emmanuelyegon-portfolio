from fpdf import FPDF

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
        # Name left-aligned, vertically centered with logo
        self.set_xy(logo_x + logo_w + 6, logo_y + 2)
        self.set_font("Helvetica", "B", 20)
        self.cell(0, 10, "EMMANUEL KIBET YEGON", 0, 1, "L")
        # Contact info left-aligned below header bar
        self.set_xy(10, 28)
        self.set_fill_color(40, 40, 40)
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "", 11)
        self.cell(190, 8, "Nakuru Kenya  |  +254-746274335  |  emmanuelyegon513@gmail.com", 0, 1, "L", True)
        self.set_text_color(0, 0, 0)
        self.ln(4)

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
        self.cell(width, 8, title, ln=1)
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
        self.set_xy(10, y)
        self.section_title("PROFESSIONAL SUMMARY", x=10, width=92)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(92, 5, "Third-year Computer Science student at the University of Kabianga with a passion for developing impactful software and tackling real-world challenges through coding. Solid background in programming, data structures, and UI/UX design. Driven to make valuable contributions to academic and industry initiatives.", align="J")
        self.ln(2)
        self.section_title("EDUCATION", x=10, width=92)
        self.set_font("Helvetica", "B", 10)
        self.cell(92, 6, "B.Sc. : Computer Science, 06/2025", ln=1)
        self.set_font("Helvetica", "", 10)
        self.cell(92, 6, "University of Kabianga - Kericho, Kenya", ln=1)
        self.ln(2)
        self.section_title("WEBSITES, PORTFOLIOS, PROFILES", x=10, width=92)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(92, 5, "- https://jhlievirsmahnu.netlify.app\n- linkedin.com/in/emmanuel-yegon-9395912aa", align="J")
        self.set_y(self.get_y()+2)

    def col_right(self, y):
        self.set_y(y)
        self.set_x(108)
        self.section_title("SKILLS", x=108, width=92)
        self.set_x(108)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(92, 6, "- Proficient in C, C++, Python, JavaScript, HTML, and CSS\n- Version control with Git and GitHub\n- Full-stack development using Express and MySQL\n- Others: UX/UI Design, Data Analytics, Problem Solving", align="J")

        self.set_x(108)
        self.section_title("WORK HISTORY", x=108, width=92)
        self.set_x(108)
        self.set_font("Helvetica", "B", 11)
        self.cell(92, 6, "End User Support, Current", ln=1)
        self.set_x(108)
        self.set_font("Helvetica", "", 10)
        self.cell(92, 6, "Kericho", ln=1)
        self.set_x(108)
        self.multi_cell(92, 6, "- Troubleshoot IT hardware/software issues\n- Assist with network configuration\n- Provide basic user training", align="J")

        self.set_x(108)
        self.section_title("CERTIFICATIONS & ACHIEVEMENTS", x=108, width=92)
        self.set_x(108)
        self.set_font("Helvetica", "", 9)
        self.multi_cell(92, 5, "- 100DaysOfCode challenge completer\n- Google Africa Developer Scholarship Participant\n- Cisco Networking Basics Certification", align="J")

        self.set_x(108)
        self.section_title("PROJECTS", x=108, width=92)
        self.set_x(108)
        self.set_font("Helvetica", "", 9)
        self.multi_cell(92, 5, "- Leave Management System: Full HR solution (React, MySQL, Node.js).\n- Chat Application: Real-time chat with offline support (Electron).\n- Portfolio Website: Built with React and deployed on Netlify", align="J")

    def generate(self, output="E-Y-c_v_fixed.pdf"):
        self.add_page()
        # Draw vertical separator (shorter, only between columns)
        self.set_draw_color(180, 180, 180)
        self.set_line_width(0.8)
        self.line(105, 40, 105, self.h - 20)
        # Draw a white rectangle to cover the right column area before writing right column content
        self.set_fill_color(255, 255, 255)
        self.rect(108, 40, 92, self.h - 60, 'F')
        self.col_left(40)
        self.col_right(40)
        self.output(output)

if __name__ == "__main__":
    pdf = EditableCV()
    pdf.generate("E-Y-c_v.pdf")
    print("✅ PDF generated successfully.")

