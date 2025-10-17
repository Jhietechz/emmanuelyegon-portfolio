import React from "react";
import { FaChartBar, FaCode, FaTools } from "react-icons/fa";
import { Divider } from "@mui/material";
import { motion } from "framer-motion";

const skills = [
	{
		category: (
			<span className="flex items-center gap-2">
				<FaCode className="text-[#C8A2C8]" />
				Languages
			</span>
		),
		items: [
			{
				name: "C",
				icon: (
					<img
						src="assets/c.png"
						alt="C"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "C++",
				icon: (
					<img
						src="assets/cpp.png"
						alt="C++"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "Java",
				icon: (
					<img
						src="assets/java.png"
						alt="Java"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "JavaScript",
				icon: (
					<img
						src="assets/javascript.png"
						alt="JavaScript"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "Python",
				icon: (
					<img
						src="assets/python.png"
						alt="Python"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "HTML/CSS",
				icon: (
					<img
						src="assets/html-css.png"
						alt="HTML/CSS"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
		],
	},
	{
		category: (
			<span className="flex items-center gap-2">
				<FaTools className="text-[#C8A2C8]" />
				Frameworks & Tools
			</span>
		),
		items: [
			{
				name: "React",
				icon: (
					<img
						src="assets/react.png"
						alt="React"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "Node.js",
				icon: (
					<img
						src="assets/nodejs.png"
						alt="Node.js"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "Git",
				icon: (
					<img
						src="assets/git.png"
						alt="Git"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "MySQL",
				icon: (
					<img
						src="assets/mysql.png"
						alt="MySQL"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "Firebase",
				icon: (
					<img
						src="assets/firebase.png"
						alt="Firebase"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
		],
	},
	{
		category: (
			<span className="flex items-center gap-2">
				<FaChartBar className="text-[#C8A2C8]" />
				Design & Analytics
			</span>
		),
		items: [
			{
				name: "Figma",
				icon: (
					<img
						src="assets/figma.png"
						alt="Figma"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "UX/UI",
				icon: (
					<img
						src="assets/uxui.png"
						alt="UX/UI"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "Data Analytics",
				icon: (
					<img
						src="assets/data-analytics.png"
						alt="Data Analytics"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
			{
				name: "Adobe Illustrator",
				icon: (
					<img
						src="assets/illustrator.png"
						alt="Illustrator"
						style={{
							width: 24,
							height: 24,
							display: "inline-block",
							verticalAlign: "middle",
						}}
					/>
				),
			},
		],
	},
];

const fadeIn = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: "easeOut" },
	},
};

const Skills = () => (
	<motion.section
		id="skills"
		className="py-12 px-4 max-w-5xl mx-auto"
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true, amount: 0.2 }}
		variants={fadeIn}
	>
		<Divider
			sx={{
				"&::before, &::after": {
					borderColor: "#ccc",
					content: '""',
				},
				marginBottom: "1rem",
			}}
		>
			<div className="flex items-center justify-center gap-1 mx-3">
				<img
					src="assets/skills.png"
					alt="Skills"
					style={{ width: "40px", height: "40px" }}
				/>
				<h2 className="text-3xl font-bold text-[#C8A2C8] text-center">
					Skills
				</h2>
			</div>
		</Divider>
		<div className="grid md:grid-cols-3 gap-8">
			{skills.map((group, idx) => (
				<motion.div
					key={
						typeof group.category === "string"
							? group.category
							: `category-${idx}`
					}
					className="bg-[#511D43]/80 rounded-lg p-6 shadow-lg"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.5, delay: idx * 0.1 }}
				>
					<h3 className="text-xl font-semibold mb-4 text-[#C8A2C8]">
						{group.category}
					</h3>
					<ul className="space-y-2">
						{group.items.map((skill) => (
							<li key={skill.name} className="flex items-center gap-3">
								<span className="text-2xl">{skill.icon}</span>
								<span>{skill.name}</span>
							</li>
						))}
					</ul>
				</motion.div>
			))}
		</div>
	</motion.section>
);

export default Skills;
