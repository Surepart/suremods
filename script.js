


//drop down logic
const logo = document.getElementById("logoBtn");
const dropdown = document.getElementById("dropdownMenu");

logo.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
});

document.addEventListener("click", (e) => {
    const isClickInsidePanel = dropdown.contains(e.target);
    const isClickOnLogo = logo.contains(e.target);

    if (!isClickInsidePanel && !isClickOnLogo) {
        dropdown.classList.remove("show");
    }
});




//tags

function filterProjects(tag) {
    const items = document.querySelectorAll(".projects-link");

    items.forEach(item => {
        const tags = item.dataset.tags;

        if (!tags) return;

        if (tag === "all") {
            item.style.display = "";
            return;
        }

        const tagList = tags
            .toLowerCase()
            .split(",")
            .map(t => t.trim());

        item.style.display = tagList.includes(tag.toLowerCase())
            ? ""
            : "none";
    });
}
function getTag() {
    const params = new URLSearchParams(window.location.search);
    return params.get("tag") || "all";
}

//feed
const projects = [
    {
        link: "projects/project1.html",
        img: "res/images/projects/project1/e.png",
        title: "Emino Mod (SurvivalCraft 2.1)",
        tags: "survivalcraftt,mod"
    },
    {
        link: "projects/survivalcrafttwopointone.html",
        img: "res/images/projects/survivalcrafttwopointone/games.png",
        title: "SurvivalCraft 2.1 Api by Gscience Studio & Lixue_Jin (moddable)",
        tags: "survivalcraftt,app"
    },
    {
        link: "projects/scpaker.html",
        img: "res/images/what.webp",
        title: "SCPacker",
        tags: "survivalcraftt,app,tool"
    },
    {
        link: "projects/rooftop.html",
        img: "res/images/projects/rooftop/game.png",
        title: "RoofTop Mod",
        tags: "fnf,mod"
    }, 
    {   
        link: "projects/kaimayentity.html",
        img: "res/images/what.webp",
        title: "KAIMyEntity Mod",
        tags: "mcjv,mod,tutorial"
    },
    {   
        link: "projects/RandomFNF_chart.html",
        img: "res/images/what.webp",
        title: "My Random Charts",
        tags: "fnf,mod"
    }
];


window.addEventListener("load", () => {
    const select = document.querySelector("select");
    if (!select) return;

    select.value = getTag();
});


function getPage() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("page")) || 1;
}

const pageSize = 9;

function renderProjects() {
    const grid = document.querySelector(".projects-grid");
    grid.innerHTML = "";

    const page = getPage();
    const tag = getTag();

    let filtered = projects;

    if (tag !== "all") {
        filtered = projects.filter(p =>
            p.tags.toLowerCase().split(",").includes(tag.toLowerCase())
        );
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const items = filtered.slice(start, end);
    


    items.forEach(p => {
        const el = document.createElement("a");
        el.href = p.link;
        el.className = "projects-link";
        el.setAttribute("data-tags", p.tags);

        el.innerHTML = `
            <div class="projects-item">
                <img src="${p.img}">
                <p>${p.title}</p>
            </div>
        `;

        grid.appendChild(el);
    });
}

renderProjects();

document.getElementById("nextBtn").addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);

    const page = parseInt(params.get("page")) || 1;
    params.set("page", page + 1);

    window.location.search = params.toString();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);

    const page = parseInt(params.get("page")) || 1;
    if (page > 1) {
        params.set("page", page - 1);
        window.location.search = params.toString();
    }
});

function setTag(tag) {
    const params = new URLSearchParams(window.location.search);
    params.set("tag", tag);
    params.set("page", 1); // reset page when filtering
    window.location.search = params.toString();
}


const images = document.querySelectorAll('.slide-track img');

images.forEach(img => {
    img.addEventListener('click', () => {
        img.classList.toggle('enlarged'); // enlarge in place
    });
});