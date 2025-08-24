
const Faq = () => {
    return (
        <div>
            <div className="grid py-10 mt-5 text-white bg-black md:grid-cols-2 gap-9 ">
            <div className="px-12 space-y-4">
                <div tabIndex={0} className="bg-black border border-white collapse collapse-arrow rounded-box">
                    <div className="text-xl font-medium collapse-title">
                        What technologies do you work with?
                    </div>
                    <div className="collapse-content">
                        <p>I primarily work with the MERN stack (MongoDB, Express.js, React.js, Node.js), SQL,Redux. I also have experience with TypeScript, Tailwind CSS, Firebase, and deployment tools like Vercel and Netlify.</p>
                    </div> 
                </div>
                <div tabIndex={0} className="bg-black border border-white collapse collapse-arrow rounded-box">
                    <div className="text-xl font-medium collapse-title">
                        Are you available for freelance or full-time work?
                    </div>
                    <div className="collapse-content">
                        <p>Yes! I'm currently open to both freelance and full-time opportunities. Feel free to contact me if you have a project or position in mind.I prefer full time first.</p>
                    </div>
                </div>
                <div tabIndex={0} className="bg-black border border-white collapse collapse-arrow rounded-box">
                    <div className="text-xl font-medium collapse-title">
                         Do you work with teams or only solo?
                    </div>
                    <div className="collapse-content">
                        <p>Both. I’ve worked solo on client projects and also collaborated in teams using tools like Git, Jira, Trello, Slack, etc. I’m comfortable adapting to any workflow.</p>
                    </div>
                </div>
               
            </div>
            <div className="px-12 space-y-4">
                <div tabIndex={0} className="bg-black border border-white collapse collapse-arrow rounded-box">
                    <div className="text-xl font-medium collapse-title">
                         How can I contact you?
                    </div>
                    <div className="collapse-content">
                        <p>You can reach out via the Contact page on this website, or message me directly on LinkedIn or by email — all links are available in the footer.</p>
                    </div>
                </div>
                <div tabIndex={0} className="bg-black border border-white collapse collapse-arrow rounded-box">
                    <div className="text-xl font-medium collapse-title">
                        Can I see some of your previous work?
                    </div>
                    <div className="collapse-content">
                        <p>Absolutely. You can check out the Projects section of this site or visit my GitHub profile to explore my recent work and open-source contributions.</p>
                    </div>
                </div>
                <div tabIndex={0} className="bg-black border border-white collapse collapse-arrow rounded-box">
                    <div className="text-xl font-medium collapse-title">
                        Why should I hire you over others?
                    </div>
                    <div className="collapse-content">
                        <p>I focus not just on writing code, but on solving real problems. I blend clean design, functional logic, and performance-driven development to deliver results that align with your business goals. I’m committed to quality and long-term value.</p>
                    </div>
                </div>
              
            </div>
        </div>
        </div>
    );
};

export default Faq;