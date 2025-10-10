// ---------------------------
// LifeScope Infinity Ultimate - Full Working Version
// Part 1: Metrics Initialization & Core Functions

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const dashboard = document.getElementById('dashboard');
const startBtn = document.getElementById('start-tracking');
const demoBtn = document.getElementById('demo-mode');
const cardsContainer = document.getElementById('cards-container');
const challengesList = document.getElementById('challenges-list');
const themeSelector = document.getElementById('theme-selector');
const exportCSVBtn = document.getElementById('export-csv');
const exportPNGBtn = document.getElementById('export-png');
const resetBtn = document.getElementById('reset-dashboard');

// ---------------------------
// Utilities
function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
function playSound(freq=440,duration=150){
  const ctx = new (window.AudioContext||window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type='sine'; o.frequency.value=freq; o.connect(g); g.connect(ctx.destination);
  o.start(); o.stop(ctx.currentTime + duration/1000);
}
function shuffleArray(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];} return arr;}

// ---------------------------
// Metrics Initialization
let metrics = {};
let metricNames = [
  // Life
  "Daily Routine","Sleep Quality","Mindfulness Minutes","Goal Progress","Time Management","Personal Growth Hours",
  "Life Satisfaction","Decision Confidence","Clutter Level","Life Balance Score","Routine Flexibility","Daily Reflection",
  "Gratitude Moments","Stress Level","Energy Flow","Motivation Level","Focus Duration","Exercise Consistency","Water Intake",
  "Healthy Habits","Social Interaction","Reading Minutes","Learning Hours","Hobby Time","Meditation Sessions","Morning Productivity",
  "Evening Wind Down","Positive Thoughts","Negativity Avoidance","Habit Streaks","Weekly Planning","Monthly Goals","Long-term Vision",
  "Self Awareness","Emotional Check-in","Life Organization","Task Completion Rate","Life Efficiency","Daily Wins","Mindset Score",
  "Adventure Level","Spontaneity","Daily Creativity","Problem Solving","Decision Making Skills","Adaptability","Self Discipline",
  "Energy Management","Personal Projects","Reflection Depth",
  // Health
  "Heart Rate","Blood Pressure","Calories Burned","Steps Today","Workout Intensity","Immune Health","Sleep Depth","Stress Hormones",
  "Vitamin Intake","Sugar Intake","Water Hydration","Body Temperature","Weight Fluctuation","Mood Level","Fatigue Level","Flexibility",
  "Strength Level","Endurance","Pain Points","Medical Checkups","Resting Heart Rate","Body Mass Index","Waist Circumference","Hydration Level",
  "Food Quality","Mental Clarity","Brain Fog","Oxygen Levels","Energy Balance","Recovery Time","Heart Variability","Cholesterol Level",
  "Blood Sugar","Protein Intake","Carb Intake","Meal Regularity","Sleep Consistency","Skin Health","Vision Health","Hearing Health",
  "Posture Score","Dental Health","Hair Health","Nail Health","Immune Boosters","Inflammation Score","Detox Level","Supplement Intake",
  "Exercise Frequency","Fitness Goals",
  // Food
  "Fruits Eaten","Vegetables Eaten","Proteins Eaten","Carbs Eaten","Fats Eaten","Snacks","Meal Variety","Caffeine Cups","Water Cups",
  "Meals Prepared","Sugar Intake","Calorie Intake","Meal Timing","Eating Out Frequency","Home Cooking","Hydration","Fiber Intake",
  "Dairy Intake","Spice Level","Meal Enjoyment","Supplements Taken","Food Quality","Balanced Diet","Food Mood Impact","Allergies Noted",
  "Food Waste","Organic Foods","Seasonal Foods","Processed Foods","Fast Food","Vitamins Consumed","Minerals Consumed","Salt Intake",
  "Healthy Recipes Tried","Meal Planning","Cooking Creativity","Food Education","Fermented Foods","Beverage Intake","Protein Shakes",
  "Juices Consumed","Tea Variety","Coffee Variety","Diet Compliance","Cheat Meals","Snack Timing","Smoothies Made","Cooking Time",
  "Micronutrients Intake","Macronutrients Balance",
  // Fun
  "Movies Watched","Books Read","Games Played","Concerts Attended","New Experiences","Hobbies Hours","Laugh Minutes","Podcasts Listened",
  "Social Outings","Adventure Activities","Travel Days","Creative Projects","Photography Sessions","Art Exhibited","Music Practiced",
  "Dance Minutes","Comedy Shows","Events Attended","Friend Hangouts","Board Games Played","Puzzles Solved","Outdoor Activities",
  "DIY Projects","Volunteering Fun","Pet Time","Jokes Told","Magic Tricks","Learning Fun","Cooking Fun","Gardening Fun","Meditation Fun",
  "Spiritual Fun","Beach Days","Nature Walks","Theme Parks","Sports Watched","Sports Played","Weekend Fun","Relaxation Hours",
  "Mini Vacations","Cultural Events","Museum Visits","Festivals Attended","City Exploration","Café Visits","Picnic Days","Shopping Fun",
  "Art Classes","Music Events","Dance Classes","Creative Writing","Creative Expression",
  // Work
  "Tasks Completed","Projects Finished","Emails Answered","Meetings Attended","Focus Hours","Deadlines Met","Work Efficiency",
  "Brainstorm Sessions","Career Goals Progress","Skill Development","Learning Work Tools","Networking Efforts","Collaboration Level",
  "Innovation Score","Presentation Hours","Public Speaking","Leadership Tasks","Problem Solving Tasks","Coding Hours","Design Hours",
  "Writing Hours","Research Hours","Client Meetings","Reports Submitted","Strategy Sessions","Team Support","Mentorship Hours",
  "Performance Reviews","Promotion Progress","Salary Negotiation","Freelance Projects","Side Hustle Hours","Career Learning","Certificates Earned",
  "Portfolio Updates","Work-Life Balance","Time Tracking","Stress at Work","Motivation at Work","Productivity Tools","Goal Achievement",
  "Team Communication","Project Planning","Work Insights","Task Prioritization","Efficiency Tips","Email Response Rate","Collaboration Hours",
  "Creative Solutions","Feedback Sessions","Deadline Adherence",
  // Money
  "Savings","Investments","Expenses","Budget Accuracy","Side Hustle Income","Financial Goals Progress","Debt Paid","Income Sources",
  "Passive Income","Credit Score","Loan Payments","Emergency Fund","Net Worth","Cash Flow","Monthly Budget","Spending Habits",
  "Income Growth","Stock Investments","Crypto Investments","Retirement Fund","Insurance Coverage","Money Management","Charity Donations",
  "Financial Education","Savings Rate","Expense Tracking","Wealth Mindset","Money Stress","Debt Ratio","Investment Returns","Taxes Paid",
  "Financial Risk","Financial Planning","Loan Approvals","Asset Management","Financial Journaling","Wealth Goals","Money Challenges",
  "Budget Adjustments","Financial Insights","Salary Tracking","Bonuses Received","Investment Learning","Expense Reduction","Money Wins",
  "Financial Rewards","Money Visualization","Money Habits","Wealth Creation","Financial Freedom Progress","Income Diversification",
  // Social
  "Messages Sent","Friends Met","Networking Events","Acts of Kindness","Family Time","New Contacts","Social Media Engagement",
  "Community Events","Mentoring","Helping Others","Relationship Quality","Social Goals","Conversation Minutes","Group Activities",
  "Support Given","Support Received","Conflict Resolution","Friendship Growth","Social Learning","Connection Quality","Networking Calls",
  "Volunteering Social","Team Fun Activities","Collaboration Social","Friend Hangouts Count","Celebrations Attended","Invitations Sent",
  "Invitations Accepted","Phone Calls","Video Calls","Letters Written","Gifts Given","Gifts Received","Appreciation Notes","Party Planning",
  "Group Projects","Game Nights","Outdoor Social","Travel With Friends","Cultural Exchange","Team Sports","Meetup Attendance",
  "Study Groups","Book Clubs","Interest Groups","Online Communities","Forum Participation","Social Media Posts","Friendship Score",
  "Communication Skills","Connection Streaks","Relationship Development","Charity Social",
  // Mood
  "Happiness Level","Anxiety Level","Motivation","Energy","Calmness","Excitement","Gratitude Minutes","Stress Relief",
  "Mood Swings","Positive Thoughts","Negative Thoughts","Relaxation","Frustration","Joy","Emotional Awareness","Mindset",
  "Emotional Balance","Patience","Anger Control","Empathy","Self Esteem","Confidence","Resilience","Optimism","Creativity Mood",
  "Sadness Level","Hopefulness","Determination","Curiosity","Contentment","Inspiration","Focus Mood","Mind Clarity",
  "Emotional Energy","Emotional Intelligence","Mood Journaling","Daily Positivity","Daily Negativity","Social Mood","Meditation Mood",
  "Mindfulness Mood","Mental Strength","Emotion Regulation","Energy Mood","Calm Energy","Excited Energy","Stress Level Mood","Relaxed Energy","Motivation Level Mood","Happiness Streak",
  // Fitness
  "Cardio Minutes","Strength Training","Flexibility","Endurance","Yoga Sessions","Distance Run","Cycling Miles","Swimming Laps","HIIT Minutes",
  "Sports Played","Steps Walked","Calories Burned Fitness","Workout Sessions","Exercise Variety","Active Minutes","Heart Rate Fitness",
  "VO2 Max","Power Output","Body Fat %","Muscle Mass","Core Strength","Agility","Balance","Reaction Time","Speed","Exercise Streak",
  "Workout Intensity","Recovery Time","Fitness Goals","Gym Attendance","Outdoor Exercise","Activity Level","Flexibility Score",
  "Strength Score","Endurance Score","Fitness Challenges","Personal Records","Pushups Done","Squats Done","Lunges Done","Plank Time",
  "Pullups Done","Workout Creativity","Fitness Consistency","Exercise Enjoyment","Fitness Streak","Training Hours","Calories In vs Out","Fitness Mood","Energy Fitness","Fitness Motivation",
  // Hobbies
  "Painting Hours","Music Practice","Coding Projects","Photography Shots","Writing Words","DIY Projects","Gardening Time","Cooking Time",
  "Creative Hours","Skill Learning","Craft Projects","Model Building","Puzzle Time","Game Design Hours","Board Games Played Hobby","Instruments Played",
  "Songs Learned","Projects Completed","Art Exhibits Attended","Workshops Attended","Hobby Enjoyment","Creative Flow","Inspiration Sources",
  "Hobby Challenges","Skill Improvement","Hobby Streak","Time Spent Hobby","Daily Creative Output","Hobby Mood","Hobby Social","Hobby Knowledge","Technique Learning","New Skills","Idea Generation","Project Planning","Project Completion","Hobby Events","Hobby Journaling","Creative Feedback","Collaboration Hobby","Showcasing Work","Hobby Creativity","Hobby Motivation","Hobby Fun","Hobby Relaxation","Hobby Engagement","Skill Mastery","Hobby Energy","Hobby Satisfaction",
  // Creativity
  "Idea Notes","Brainstorm Sessions","Sketches Made","Creative Hours","Innovations","Problem-Solving Wins","Inspiration Sources Creativity",
  "Creative Output","Creative Projects","Writing Exercises","Design Projects","Art Projects","Music Compositions","Innovation Hours","Daily Creativity Tasks",
  "Creative Mindset","Brainstorm Streak","Creative Thinking Exercises","New Ideas Generated","Creative Mood","Creative Journaling","Creative Feedback","Creative Skills","Creative Growth","Creative Flow","Imagination Minutes","Innovation Minutes","Concept Development","Idea Refinement","Creative Exploration","Creative Challenges","Creativity Streak","Creative Goals","Creative Energy","Creative Inspiration","Collaboration Creativity","Creative Motivation","Creative Satisfaction","Creative Fun","Creative Engagement","Creative Productivity","Creative Projects Completed","Creative Learning","Creative Play","Creative Adventure","Creative Achievement","Creative Vision","Creative Discipline","Creative Mastery","Creative Recognition","Creative Planning","Creative Discovery","Creative Expression","Creative Momentum"
];

metricNames.forEach(m=>metrics[m]={value:getRandomInt(0,50),trend:0,streak:0});

// ---------------------------
// Achievements & Easter Eggs
let achievementsUnlocked = [];
function checkAchievements(metricName){
  if(metrics[metricName].value >= 900 && !achievementsUnlocked.includes(metricName)){
    achievementsUnlocked.push(metricName);
    confetti({particleCount:50,spread:70,origin:{y:0.6}});
    playSound(880,200);
    alert(`🎉 Achievement Unlocked: ${metricName}!`);
  }
}
function checkEasterEgg(metricName){
  if(metricName.includes("42") || metricName.includes("7")){alert("💡 Secret Easter Egg Unlocked!");}
}

// ---------------------------
// Confetti helper
function confetti(opts){if(window.confetti) window.confetti(opts);}
// ---------------------------
// Part 2: Rendering, Interaction & Charts

// Initialize dashboard container
function renderDashboard(){
  cardsContainer.innerHTML = '';
  metricNames.forEach(metric=>{
    const card = document.createElement('div');
    card.className = 'card';

    // Metric Title
    const title = document.createElement('h3');
    title.textContent = metric;
    card.appendChild(title);

    // Value Display
    const valueSpan = document.createElement('span');
    valueSpan.className = 'metric-value';
    valueSpan.textContent = metrics[metric].value;
    card.appendChild(valueSpan);

    // Click to increment
    card.addEventListener('click',()=>{
      const increment = getRandomInt(1,10);
      metrics[metric].value += increment;
      metrics[metric].trend = 1;
      metrics[metric].streak += 1;
      valueSpan.textContent = metrics[metric].value;
      animateCounter(valueSpan);
      checkAchievements(metric);
      checkEasterEgg(metric);
      updateProgressBar(metric,card);
      updateMiniChart(metric,card);
      playSound(440 + getRandomInt(-50,50),150);
    });

    // Progress bar
    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'progress-bar';
    const progressInner = document.createElement('div');
    progressInner.className = 'progress-bar-inner';
    progressWrapper.appendChild(progressInner);
    card.appendChild(progressWrapper);

    // Mini chart placeholder
    const canvas = document.createElement('canvas');
    canvas.className = 'metric-chart';
    card.appendChild(canvas);

    cardsContainer.appendChild(card);
  });
}

// ---------------------------
// Progress Bar Updates
function updateProgressBar(metric,card){
  const val = metrics[metric].value;
  const pct = Math.min((val/1000)*100,100);
  const barInner = card.querySelector('.progress-bar-inner');
  barInner.style.width = `${pct}%`;
  barInner.style.backgroundColor = `hsl(${Math.min(pct,120)},80%,50%)`;
}

// ---------------------------
// Mini Chart Updates
let miniCharts = {};
function updateMiniChart(metric,card){
  const canvas = card.querySelector('.metric-chart');
  if(!miniCharts[metric]){
    miniCharts[metric] = new Chart(canvas,{
      type:'line',
      data:{
        labels:[0,1,2,3,4,5,6,7,8,9],
        datasets:[{label:metric,data:Array(10).fill(metrics[metric].value),borderColor:'#0077ff',fill:false,tension:0.3}]
      },
      options:{responsive:true,plugins:{legend:{display:false}},animation:false,scales:{y:{beginAtZero:true}}}
    });
  }else{
    const dataSet = miniCharts[metric].data.datasets[0].data;
    dataSet.shift(); dataSet.push(metrics[metric].value);
    miniCharts[metric].update();
  }
}

// ---------------------------
// Animate counter (scale)
function animateCounter(el){anime({targets:el,scale:[1,1.5,1],duration:400,easing:'easeInOutQuad'});}

// ---------------------------
// Live Random Updates
function startLiveUpdates(){
  setInterval(()=>{
    const metric = metricNames[getRandomInt(0,metricNames.length-1)];
    const increment = getRandomInt(0,5);
    metrics[metric].value += increment;
    const card = Array.from(document.getElementsByClassName('card')).find(c=>c.querySelector('h3').textContent===metric);
    if(card){
      const valSpan = card.querySelector('.metric-value');
      valSpan.textContent = metrics[metric].value;
      animateCounter(valSpan);
      updateProgressBar(metric,card);
      updateMiniChart(metric,card);
      checkAchievements(metric);
    }
  },10000); // every 10 seconds
}

// ---------------------------
// Dashboard Start
startBtn.addEventListener('click',()=>{
  welcomeScreen.style.display='none';
  dashboard.style.display='block';
  renderDashboard();
  startLiveUpdates();
});

// ---------------------------
// Demo Mode (random increments)
demoBtn.addEventListener('click',()=>{
  welcomeScreen.style.display='none';
  dashboard.style.display='block';
  renderDashboard();
  setInterval(()=>{
    const metric = metricNames[getRandomInt(0,metricNames.length-1)];
    metrics[metric].value += getRandomInt(1,20);
    const card = Array.from(document.getElementsByClassName('card')).find(c=>c.querySelector('h3').textContent===metric);
    if(card){
      const valSpan = card.querySelector('.metric-value');
      valSpan.textContent = metrics[metric].value;
      animateCounter(valSpan);
      updateProgressBar(metric,card);
      updateMiniChart(metric,card);
      checkAchievements(metric);
    }
  },2000);
});
// ---------------------------
// Part 3: Extras & Enhancements

// ---------------------------
// Theme Switching
const themes = {
  "Default": {bg:'#f0f2f5',card:'#ffffff',text:'#333333'},
  "Dark": {bg:'#1e1e1e',card:'#2b2b2b',text:'#f0f0f0'},
  "Ocean": {bg:'#cce7ff',card:'#ffffff',text:'#004466'},
  "Forest": {bg:'#e6f5e6',card:'#ffffff',text:'#0b3d0b'},
  "Sunset": {bg:'#ffe6e6',card:'#ffffff',text:'#661111'}
};
themeSelector.addEventListener('change',(e)=>{
  const t = themes[e.target.value];
  document.body.style.backgroundColor = t.bg;
  document.querySelectorAll('.card').forEach(c=>{
    c.style.backgroundColor = t.card;
    c.style.color = t.text;
  });
});

// ---------------------------
// Challenges Panel
let challenges = [
  {name:"Complete 5 Metrics",completed:false},
  {name:"Reach 1000 Total Value",completed:false},
  {name:"Click 100 Times",completed:false},
  {name:"Activate Demo Mode",completed:false},
  {name:"Achieve 10 Milestones",completed:false},
  {name:"Update All Metrics Once",completed:false},
  {name:"Find an Easter Egg",completed:false},
  {name:"Theme Switch Challenge",completed:false},
  {name:"Export CSV",completed:false},
  {name:"Export PNG",completed:false}
];
function renderChallenges(){
  challengesList.innerHTML='';
  challenges.forEach((ch,i)=>{
    const li = document.createElement('li');
    li.textContent = ch.completed?`✅ ${ch.name}`:`❌ ${ch.name}`;
    li.addEventListener('click',()=>{ch.completed=!ch.completed; renderChallenges();});
    challengesList.appendChild(li);
  });
}
renderChallenges();

// ---------------------------
// CSV Export
exportCSVBtn.addEventListener('click',()=>{
  let csv = 'Metric,Value,Trend,Streak\n';
  metricNames.forEach(m=>{
    const {value,trend,streak} = metrics[m];
    csv += `"${m}",${value},${trend},${streak}\n`;
  });
  const blob = new Blob([csv],{type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'lifescope_metrics.csv';
  a.click(); URL.revokeObjectURL(url);
  alert('✅ CSV Exported!');
  // Challenge completion
  const ch = challenges.find(c=>c.name==="Export CSV"); if(ch) ch.completed=true; renderChallenges();
});

// ---------------------------
// PNG Export
exportPNGBtn.addEventListener('click',()=>{
  html2canvas(document.getElementById('dashboard')).then(canvas=>{
    const link = document.createElement('a');
    link.download = 'lifescope_dashboard.png';
    link.href = canvas.toDataURL();
    link.click();
    alert('✅ PNG Exported!');
    // Challenge completion
    const ch = challenges.find(c=>c.name==="Export PNG"); if(ch) ch.completed=true; renderChallenges();
  });
});

// ---------------------------
// Reset Dashboard
resetBtn.addEventListener('click',()=>{
  if(confirm("⚠️ Are you sure you want to reset all metrics?")){
    metricNames.forEach(m=>{metrics[m]={value:0,trend:0,streak:0};});
    renderDashboard();
    renderChallenges();
  }
});

// ---------------------------
// Confetti Milestones
setInterval(()=>{
  const total = metricNames.reduce((sum,m)=>sum+metrics[m].value,0);
  if(total>50000){confetti({particleCount:100,spread:160,origin:{y:0.6}});}
},60000);

// ---------------------------
// Hover Tooltips
cardsContainer.addEventListener('mouseover',(e)=>{
  if(e.target.tagName==='H3'){
    const metric = e.target.textContent;
    e.target.title = `Value: ${metrics[metric].value} | Trend: ${metrics[metric].trend} | Streak: ${metrics[metric].streak}`;
  }
});

// ---------------------------
// Extra Animations & Easter Eggs
function randomCardPop(){
  const cards = Array.from(document.getElementsByClassName('card'));
  const card = cards[getRandomInt(0,cards.length-1)];
  if(card){
    anime({targets:card,translateY:[0,-10,0],scale:[1,1.05,1],duration:600,easing:'easeInOutQuad'});
  }
}
setInterval(randomCardPop,8000);

// ---------------------------
// Welcome Screen Text (optional)
welcomeScreen.querySelector('p').innerHTML="Welcome to <strong>LifeScope Infinity Ultimate</strong>!<br>Track every aspect of your life, health, fitness, fun, work, finances, creativity, and more. Click 'Start Tracking' to begin your journey to ultimate self-awareness and personal growth.";

// ---------------------------
// Initial Render (if dashboard visible)
if(dashboard.style.display==='block'){renderDashboard(); startLiveUpdates();}
