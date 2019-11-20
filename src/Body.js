import React from 'react'
import Chart from 'chart.js'
import { Line } from 'react-chartjs-2'
import { groupBy, intersection } from 'lodash'

import csv from './data/world-forecast.csv'

// colors from https://medium.com/p/fcd4e707a283/responses/show
const COLORS = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00']

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

console.log(COLORS)

const dataTransform = (data) => {
  const numberOfDataPoints = Object.entries(data[0]).length - 1
  const labels = Array.apply(null, Array(numberOfDataPoints))
    .map((_, i) => `Score ${ordinalSuffixOf(i + 1)} Year`)
  const datasets = data.reduce((accum, country, index) => {
    return accum.concat({
      label: country['Country Name'],
      data: labels.map(o => country[o]),
      fill: false,
      lineTension: 0.1,
      // backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: COLORS[index],
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      // pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      // pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    })
  }, [])
  return { datasets, labels }
}

function ordinalSuffixOf(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export default () =>
  <div id='main'>
    {/* <div class='row height0'>
      <div class='nav row_w'>
        <span><a href='#about'>About</a></span>
        <span><a href='#mission'>Mission</a></span>
        <span><a href='#key_functions'>Key Functions</a></span>
        <span><a href='#advisory_board'>Advisory Board</a></span>
        <span><a href='#strategic_partnering'>Strategic partnering</a></span>
      </div>
      <div class='social row_nw' />
    </div> */}

    <div id='about' class='row'>
      <h2>Maturity Model</h2>
      <p class='large'>We have created a maturity model so that countries and organisations can take stock of where they are now and build a picture of how they compare to other countries or organisations. Allowing them to identify gaps and accelerate growth and ensure that appropriate foundations are in place to ensure long term success of AI.</p>
      <div style={{
        'marginLeft': 'auto',
        'marginRight': 'auto',
        'maxWidth': '800px',
        'textAlign': 'center'
    }}>
        <p class='large'>Overall World AI Relative Ranking Forecast</p>
      <Line
        data={dataTransform(csv)}
      />
      </div>
    </div>

    {/* <div id='mission' class='row indent'>
      <h2>Mission</h2>
      <blockquote>The Cyber Institute aims to transform cyber for the betterment of humanity.</blockquote>
      <p>The Cyber Institute will be a trusted advisor to government, industry and community, helping people and organisations understand the risks and their own vulnerabilities in the cyber world, and ensuring that cyber enables opportunity and freedom.</p>
      <p>The Institute will do this by addressing long term problems only visible at the intersection of academia, government and industry, and building a new system of knowledge into the shape and nature of the cyber world.</p>
      <p>The Institute will take these insights to create the best cyber professionals, equipped to meet the demands of a fast changing social, economic, technological and geostrategic environment in the 21st century.</p>
      <p>Uniquely, the Institute will integrate its academic cyber program with a real-time security operations centre. The resultant Cyber Hub will be the nexus of research and learning, partnerships and community, in the physical and online world—the first of its kind in the world.</p>
      <p>The Institute will model a different university experience for its students and its partners.</p>

      <div class='accordions row_w jc-sb'>
        <input type='checkbox' class='display-none' id='defining_cyber' name='defining_cyber' checked='' />
        <label for='defining_cyber' style='margin-bottom: 377px;'><span>Defining Cyber</span></label>
        <div class='content defining_cyber'>
          <div>
            <blockquote>Modern usage applies ‘cyber’ as a shorthand for security concerns caused by technical problems, and best addressed with technical solutions.</blockquote>
            <p>But experience shows that cyber is a deeply human activity. It is about our motives, skills, and capabilities; our intent and how we use, or are used by technology; the culture in which we are embedded; and the expectations of nations.</p>
            <p>For the Cyber Institute, ‘cyber’ is about people and the problems that arise when people design, build and use technology.</p>
          </div>
        </div>

        <input type='checkbox' class='display-none' id='problem_cyber' name='problem_cyber' />
        <label for='problem_cyber' style='margin-bottom: 352px;'><span>The Problem with Cyber</span></label>
        <div class='content problem_cyber'>
          <div>
            <blockquote>Cyber is a constant series of move, counter-move, fix, and repeat on the dark side of our use of technology.</blockquote>
            <p>Unchecked systems will focus simply on building walls, and holding people’s wellbeing hostage. Aside from exhaustion or capitulation, there is no end to that state, and many are already fighting that battle.</p>
            <p>Solely following that path will mean a retreat, a loss of trust in the scaffolding of our norms and institutions, and a limit to potential opportunity and freedom.</p>
          </div>
        </div>

        <input type='checkbox' class='display-none' id='anuci_unlock' name='anuci_unlock' />
        <label for='anuci_unlock' style='margin-bottom: 422px;'><span>What the Cyber Institute will do to unlock this dynamic</span></label>
        <div class='content anuci_unlock'>
          <div>
            <p>At the Cyber Institute we think the approach to cyber needs to be smart and think ahead, find a balance, understand the risks, and develop adaptive resilience, so we can confidently rely on the digital technologies in our lives, our economy, our society, and our liberal, democratic culture.</p>
            <p>We need to recast our understanding of the problem. We have to address the systems-of-systems and strategic levels, across all actors, to break the cycle. And we need the people, across all walks of life, who can do that.</p>
            <blockquote>The role of the Cyber Institute is to be the catalyst for this change.</blockquote>
            <p>And we are looking for partners to build capability, identify the urgent and strategic, and collaborate on solutions in this new dynamic.</p>
          </div>
        </div>
      </div>

    </div>
    <div class='row indent'>
      <h2>Leadership and Governance</h2>
      <p>The Cyber Institute is led by professionals with applied experience in responding to cyber threats. Its Advisory Board is chaired by a Nobel Laureate, and the Institute draws on a breadth of world-class research and expertise. From the technical to the human sciences, and with an unrivalled lens on the Indo-Pacific, the Institute reinforces the special charter of the Australian National University as a resource of national significance.</p>
      <p>Dr Lesley Seebeck is the inaugural CEO of the ANU Cyber Institute, and will be supported in the delivery of the Institute’s research and education programs by a Chief Scientist and a Chief Social Scientist. The development and implementation of the Cyber Hub will be managed in partnership with the university’s Chief Information Security Officer. As a business unit of The Australian National University, the ANU Cyber Institute draws on the professional support of the university, with a dedicated operations, engagement and outreach team to support delivery of the Institute’s strategy.</p>
      <p>The Institute is governed under the Australian National University Act 1991 and the Public Governance, Performance &amp; Accountability Act 2013, and has an Advisory Board constituted to provide high quality objective advice to the university regarding the Institute’s research and business plan and associated investment strategy.</p>
      <p>The Advisory Board inaugural members will be announced in the near future.</p>
    </div>

    <div id='key_functions' class='row indent'>
      <h2>Key Functions</h2>
      <div class='accordions row_w jc-sb'>
        <input type='checkbox' class='display-none' id='cyber_hub' name='cyber_hub' checked='' />
        <input type='checkbox' class='display-none' id='education' name='education' />
        <input type='checkbox' class='display-none' id='wicked_problems' name='wicked_problems' />

        <label for='cyber_hub' style='margin-bottom: 563px;'><span>The Cyber Hub</span></label>
        <div class='content cyber_hub'>
          <div>
            <blockquote>The approach of the Cyber Institute is to normalise cyber as a part of our everyday lives and workaday worlds.</blockquote>
            <p>Hands-on, real-life operations will be core, and one of the key differentiators of the Institute. The Cyber Hub will integrate the cyber security operations (CSOC) function of the ANU into the academic program. This represents a step change in research, education and service provision.</p>
            <p>Together with an online presence, the Institute’s Cyber Hub will provide the opportunity to test ideas, and communicate and visualise cyber threats, mitigations and activities.</p>
            <p>Access to a real-time, operational environment provides ideal training and research conditions. The Cyber Hub will cover a range of bespoke and highly specialised technologies, operated by a diverse and ever-changing mix of staff, students, and visitors on a distributed network within an academic institution which is a foreign target of interest.</p>
            <p>Cyber Hub community members will join the best of the best, capable of contributing to and learning from a multi-dimensional space to define problems and seek solutions.</p>
          </div>
        </div>

        <label for='education' style='margin-bottom: 754px;'><span>Education</span></label>
        <div class='content education'>
          <div>
            <blockquote>The intent of the Cyber Institute is to do for cyber what the MBA did for management. The Institute’s program in cyber masters will build skill sets from conceptual frameworks and experiential learning.</blockquote>
            <p>The structure of cyber masters education will enable it to be readily adapted for individual academic development, executive education, international assistance, or to build organisational capability.</p>
            <p>To be eligible for the full Cyber Masters qualification, a student will need to qualify for and complete a capstone project with an individual component and group-based scenario/s over two to three months. This will draw all the elements of cyber learning together and test them in practice.</p>
            <p>Cyber Masters will demonstrate the social and ethical ethos, and have the strategic nous, to become the influential leaders in cyber technology, policy and law.</p>
            <p>To design and deliver the best Cyber Masters program we will require the active partnership of a diverse set of organisations, people and skills.</p>
            <ul>
              <li>Partner by collaborating on content design. Help us frame an experience that allows student understanding of industry, government and research; or test our foundational components with your staff.</li>
              <li>Partner by becoming a community mentor. The Institute will establish a cyber masters community of learning accessible to anyone on its cyber learning path, creating a ‘stickiness’ that will have our graduates becoming part of a life of learning network.</li>
              <li>Partner by sponsoring students or booking a customised session with your leadership team.</li>
            </ul>
            <p><b>TARGET DELIVERY: First student cohort SEMESTER 1 2020</b></p>
          </div>
        </div>

        <label for='wicked_problems' style='margin-bottom: 649px;'><span>Research into the wicked problems</span></label>
        <div class='content wicked_problems'>
          <div>
            <blockquote>The Cyber Institute will direct its focus towards initiatives which take a deep perspective on cyber.</blockquote>
            <p>Inter-disciplinarity and cross-sector collaboration is needed to lean forward into the difficult, wicked problems in cyber. Only with this combination can we hope to address both the near (symptom) and the deep (cause) issues.</p>
            <p>Universities are engaged in the long-term: it takes time to build capacity, to learn deeply, to season research in emerging fields, to establish practice and devise solutions aimed at cause rather than symptom.</p>
            <p>Problems and opportunities require an understanding of how relationships affect solutions across individual, organisational, nation state and global levels. The ANU Cyber Institute will catalyse these investigations and translate them into practical tools and advice.</p>
            <p>Research program collaborators will be those who can shape an ecosystem of trust, through the ongoing exchange and shared practice necessary to ensure deep continued learning and sustained change.</p>
            <p>Cyber is a team sport and so interaction, partnership and collaboration is embedded within the Cyber Institute’s DNA.</p>
            <p><b>TARGET DELIVERY: Interdisciplinary research program fully underway MID2020</b></p>
          </div>
        </div>
      </div>
    </div>

    <div class='purple'>
      <div class='row indent'>
        <blockquote>The time is now. Let us know where and how you are best placed to be involved. And join us to bring trust, freedom and opportunity to cyber.<span>- Dr. Lesley Seebeck, CEO</span></blockquote>
      </div>
    </div>

    <div id='advisory_board' class='row indent team'>
      <h2>Advisory Board</h2>
      <div id='team' class='row_w'>
        <div class='member'>
          <div class='img' style="background-image: url('/img/professor_brian_schmidt.jpg')" />
          <div class='hover'>
            <div>
              <div class='name'>Professor Brian P. Schmidt AC FAA FRS </div>
              <div class='title'>Vice-Chancellor and President, The Australian National University</div>
              <div class='desc'>2011 Nobel Laureate Physics</div>
            </div>
          </div>
          <div class='content UIHTMLContent'>
            <div class='body'>
              <p>Professor Brian P. Schmidt was appointed Vice-Chancellor and President of The Australian National University (ANU) in January 2016.</p>
              <p>Professor Schmidt is the 12th Vice-Chancellor of The Australian National University (ANU). Winner of the 2011 Nobel Prize in Physics, Professor Schmidt was an astrophysicist at the ANU Mount Stromlo Observatory and Research School of Astronomy and Astrophysics before becoming Vice-Chancellor.</p>
              <p>Professor Schmidt received undergraduate degrees in Astronomy and Physics from the University of Arizona in 1989, and completed his Astronomy Master's degree (1992) and PhD (1993) from Harvard University. Under his leadership, in 1998, the High-Z Supernova Search team made the startling discovery that the expansion rate of the Universe is accelerating. Fellow of the Australian Academy of Science, The United States Academy of Science, and the Royal Society, he was made a Companion of the Order of Australia in 2013.</p>
            </div>
          </div>
        </div>

        <div class='member'>
          <div class='img' style="background-image: url('/img/professor_elanor_huntington.jpg')" />
          <div class='hover'>
            <div>
              <div class='name'>Professor Elanor Huntington</div>
              <div class='title'>Dean, College of Engineering &amp; Computer Science, The Australian National University</div>
            </div>
          </div>
          <div class='content UIHTMLContent'>
            <div class='body'>
              <p>Professor Elanor Huntington is the first female Dean of Engineering and Computer Science at the Australian National University. Professor Huntington was previously the Head of School for the School of Engineering and Information Technology at UNSW Canberra. Additionally she has served as Chief Investigator on several Australian Research Council projects, Program Manager for the ARC Centre for Excellence in Quantum Computational Communication Technologies and is an Honorary Fellow for The Institution of Engineers Australia. Professor Huntington has a long history of council and board contributions including previous service on the ACT Accreditation and Registration Council as well as currently serving on the Board of Significant Capital Ventures.</p>
              <p>Professor Huntington holds a PhD (2000) in experimental quantum optics from the ANU. Her current research includes the control of quantum systems, with a particular interest in the interface between theory and applications.</p>
            </div>
          </div>
        </div>

        <div class='member'>
          <div class='img' style="background-image: url('/img/professor_rory_medcalf.jpg')" />
          <div class='hover'>
            <div>
              <div class='name'>Professor Rory Medcalf</div>
              <div class='title'>Head of the National Security College, The Australian National University</div>
            </div>
          </div>
          <div class='content UIHTMLContent'>
            <div class='body'>
              <p>Rory Medcalf is a Professor and the Head of the National Security College (NSC) at the Australian National University. His career spans diplomacy, intelligence analysis, journalism, think tanks and academia. Under his leadership, the NSC has extended its work beyond executive education, academic teaching and research into a think-tank oriented capacity for futures analysis and engagement with the national policy debate. He was founding director of the international security program at the Lowy Institute and a member of the independent expert panel on the 2016 Australian Defence White Paper. He was an early proponent of the Indo-Pacific concept of Australia's strategic environment, which remains one of his principal research interests.</p>
            </div>
          </div>
        </div>

        <div class='member'>
          <div class='img' style="background-image: url('/img/marie_johnson.jpg')" />
          <div class='hover'>
            <div>
              <div class='name'>Ms. Marie Johnson</div>
              <div class='title'>Managing Director and Chief Digital Officer</div>
              <div class='desc'>Centre for Digital Business</div>
            </div>
          </div>
          <div class='content UIHTMLContent'>
            <div class='body'>
              <p>Marie Johnson is the Managing Director of the Centre for Digital Business. Marie is an accessibility advocate, and a recognized global speaker and commentator on artificial intelligence; technology; digital services; ehealth; identity; and innovation. Her extensive experience covers the public and private sectors in Australia and internationally, in roles including large scale government service delivery operations; leading Microsoft's worldwide public services and egovernment business in Seattle; Chief Information Officer; Chief Technology Architect; Technology Authority; and board director. Marie is now leading R&amp;D on the “Digital Human Cardiac Coach”.</p>
              <p>Her achievements have been recognised globally: UN Public Services Award; Australian PM's Award for Excellence in Public Sector Management; Innovative CIO of the Year – Australia; 100 Women of Influence; named as one of Singularity University Exponential Medicine Global XMed Digital Vanguard; and recently joined the MIT Technology Review Global Insights Panel.</p>
            </div>
          </div>
        </div>

        <div class='member'>
          <div class='img' style="background-image: url('/img/hamish_hawthorn.jpg')" />
          <div class='hover'>
            <div>
              <div class='name'>Mr. Hamish Hawthorn</div>
              <div class='title'>COO, UpGuard</div>
            </div>
          </div>
          <div class='content UIHTMLContent'>
            <div class='body'>
              <p>Hamish Hawthorn is UpGuard's Chief Operating Officer, driving operations and corporate development activities, and overseeing partnerships with the cyber insurance sector. Hamish has been involved in the commercialisation of new technologies for over twenty 20 years, and his experience spans the software, biotechnology and advanced manufacturing sectors.  UpGuard is the world's first cyber resilience platform, designed to proactively assess cyber risk for every organization. UpGuard monitors the digital footprints of millions of organizations, automates assessment questionnaires, and synthesizes those factors into the most accurate cyber risk score.</p>
            </div>
          </div>
        </div>

        <div class='member'>
          <div class='img' style="background-image: url('/img/deborah_anton.jpg')" />
          <div class='hover'>
            <div>
              <div class='name'>Ms. Deborah Anton</div>
              <div class='title'>Interim National Data Commissioner</div>
              <div class='desc'>Department of the Prime Minister and Cabinet</div>
            </div>
          </div>
          <div class='content UIHTMLContent'>
            <div class='body'>
              <p>Over the past two decades, Ms Anton has worked in the Australian Public Service with wide ranging experience in legislation, regulation, policy and program delivery, including the establishment of the Government's Computer Emergency Response Team (CERT), which is the primary point of contact for Australian businesses to prevent and respond to malicious activity.</p>
              <p>Ms Anton holds a Bachelor of Science with Honours and Master of Management from the Australian National University (ANU). She has also completed the Company Directors Course from the Australian Institute of Company Directors from the National Security College's Executive Development Program.</p>
            </div>
          </div>
        </div>

        <div class='member'>
          <div class='img' style="background-image: url('/img/mick_ryan.jpg')" />
          <div class='hover'>
            <div>
              <div class='name'>MAJGEN Mick Ryan</div>
              <div class='title'>Major General at Australian Army</div>
            </div>
          </div>
          <div class='content UIHTMLContent'>
            <div class='body'>
              <p>Major General Ryan was appointed Commander, Australian Defence College in January 2018. Over his 30 year career he has commanded at all levels and served in East Timor with the 6RAR Battalion Group in 2000, in Iraq as the Deputy J3 for the Multi-National Security Transition Command, and in Afghanistan where he commanded Australia's 1st Reconstruction Task Force in southern Afghanistan from August 2006 to April 2007, for which he was awarded the Order of Australia.</p>
              <p>Major General Ryan has deep experience the fields of strategy, interagency and joint operations, and command and leadership as well as professional military education.  He was founding President of the Defence Entrepreneurs Forum (Australia), an undertaking to nurture innovation in the ADF's junior leaders.  He is a Member of the Military Writers Guild.</p>
              <p>Major General Ryan graduated from the Royal Military College, Duntroon, in 1989, has a Bachelor's degree in Asian Studies from the University of New England and is a graduate of the Australian Defence Force School of Languages.  He is a Distinguished Graduate of the United States Marine Corps Command and Staff College, and a graduate of the USMC School of Advanced Warfighting.  In 2012, he graduated with distinction from the Johns Hopkins University, School of Advanced International Studies, earning a Masters in International Public Policy.</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div id='strategic_partnering' class='row indent'>
      <h2>Strategic partnering</h2>
      <p>The vision of the Cyber Institute speaks to well-established needs to address issues of cyber trust, design, risk and resilience highlighted by ecosystem enablers including the Australian Cyber Security Growth Network and Commonwealth of Australia’s domestic and international cyber strategies. Early market validation suggests that the Cyber Institute is taking a genuinely unique approach to address these issues and also take advantage of the opportunities presented in the cyber world.</p>
      <blockquote>The Cyber Institute has a critical role in shaping the future, but it is only one player in the overall ecosystem. We are looking for partners willing to lean forward into the future risks and opportunities of the digital revolution and pay forward to build capacity.</blockquote>
      <p>The Institute’s partnership model encourages participation from all cyber players – we are designing in permeability from the outset. This permeability is critical to seeding and amplifying activities across the broader ecosystem, and also growing the Australian cyber skills base at the rate needed. The Institute aims to develop under three levels of engagement via Foundation, Program and Project partners. Talk to us about your needs, and together we can develop a collaboration to create mutual value.</p>
      <div class='two-col row_w jc-sb'>
        <div>
          <h3>Foundation Partners</h3>
          <ul>
            <li>will co-invest time, expertise and funding to develop relevant research, co-design core offerings for the Cyber Masters program, and build the Cyber Hub in a real-world feedback loop;</li>
            <li>are building the core offering of the Institute with Institute staff and assuming greater risk than those partnering on specific project or program output and will share in appropriate levels of rewards;</li>
            <li>will mitigate risk by investing against a series of milestones, governed under a Board with Foundation Partners representation, while making significant in-kind contributions; and,</li>
            <li>will be representative of entities in a collaborative supply chain that can together articulate problems, develop solutions and test application. </li>
          </ul>
        </div>
        <div>
          <h3>Program Partners</h3>
          <ul>
            <li>will partner on specific longer-term collaborative projects, involving research, education or operations centre sponsorship;</li>
            <li>will leverage investment against achievement of specific program outputs, governed under a program agreement; and,</li>
            <li>may be more diffuse in focus, and draw from extensive expertise across the ANU.</li>
          </ul>
          <h3>Project Partners</h3>
          <ul>
            <li>will transact on shorter term projects for specific set outcomes.</li>
          </ul>
        </div>
      </div>
    </div> */}

  </div>
