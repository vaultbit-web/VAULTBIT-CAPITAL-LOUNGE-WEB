document.addEventListener('DOMContentLoaded', () => {
    // --- n8n CONFIGURATION ---
    const N8N_WEBHOOK_URL = 'https://dokployn8n.vaultbit.es/webhook/e02f16ac-4615-4a4c-8bbb-d98d1d9eb289';

    // 1. Navigation Reveal on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(5, 5, 5, 0.95)";
            navbar.style.borderBottom = "1px solid var(--vb-gold)";
        } else {
            navbar.style.background = "rgba(5, 5, 5, 0.8)";
            navbar.style.borderBottom = "1px solid var(--vb-border)";
        }
    });

    // 2. Technical Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const itemsToReveal = document.querySelectorAll('.grid-item, .stat-box, .hero-content > *, .spec-row, section > .container > *');
    itemsToReveal.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(5px)';
        item.style.transition = `all 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.02}s`;
        revealObserver.observe(item);
    });

    // 3. Modal Logic
    const modal = document.getElementById('contactModal');

    window.openModal = () => {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // 4. Form Submission (Structured for Notion Mapping)
    const contactForm = document.getElementById('contactForm');
    const statusText = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const currentLang = localStorage.getItem('vb_lang') || 'en';
            submitBtn.disabled = true;
            statusText.style.display = 'block';
            statusText.style.color = 'var(--vb-gold)';
            statusText.textContent = currentLang === 'en' ? 'TRANSMITTING DOSSIER REQUEST...' : 'TRANSMITIENDO SOLICITUD DE DOSSIER...';

            const payload = {
                nombre: document.getElementById('name').value,
                empresa: document.getElementById('company').value,
                correo: document.getElementById('email').value,
                telefono: document.getElementById('phone').value,
                mensaje: document.getElementById('message').value
            };

            const formData = new URLSearchParams();
            formData.append('nombre', payload.nombre);
            formData.append('empresa', payload.empresa);
            formData.append('correo', payload.correo);
            formData.append('telefono', payload.telefono);
            formData.append('mensaje', payload.mensaje);

            try {
                // Fetch con mode: 'no-cors' para máxima compatibilidad si SSL falla o CORS es estricto
                await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });

                statusText.style.color = '#00ffaa';
                statusText.textContent = dictionary[currentLang].f_success;
                contactForm.reset();
                setTimeout(closeModal, 3000);

            } catch (error) {
                statusText.style.color = '#ff4444';
                statusText.textContent = dictionary[currentLang].f_error;
                console.error('Submission failed:', error);
            } finally {
                submitBtn.disabled = false;
            }
        });
    }

    // 5. Internationalization (i18n) Engine
    const dictionary = {
        en: {
            nav_model: "01. The Experience",
            nav_services: "02. The Shell",
            nav_hardware: "03. The Core",
            nav_compliance: "04. Firewall",
            nav_cta: "REQUEST SPATIAL AUDIT",

            hero_mod: "MODULE 00 // INITIALIZATION",
            hero_est: "EST. 2026 — SWISS OPERATED INFRASTRUCTURE",
            hero_h1_1: "VaultBit",
            hero_h1_2: "Capital Lounge.",
            hero_h1_3: "Architecture of Sovereignty.",
            hero_desc: "We engineer hyper-secure B2B environments where digital sovereignty meets physical discretion. Transforming real estate into institutional-grade crypto-trading lounges and 'The Vault Sessions' elite event nodes.",
            hero_cta_primary: "INITIALIZE AUDIT",
            hero_cta_secondary: "LOUNGE CATALOG",

            vp_mod: "MODULE 01 // THE INSTITUTIONAL LOUNGE",
            vp_label: "01. THE EXPERIENCE",
            vp_title: "Knowledge & <br> Elite Networking.",
            vp_desc: "VaultBit redefines spatial value through the 'The Vault Sessions' — an exclusive ecosystem for UHNW individuals involving private investment talks, digital heritage mentorship, and institutional-grade networking orchestrated within a fortress-grade perimeter.",
            vp_item_1: "Executive Trading Sanctuaries: Secure 'Self-Service' terminals with independent encrypted networks and Security Box Points.",
            vp_item_2: "The Vault Sessions: Elite networking events and legacy orchestration for the global crypto elite.",
            vp_item_3: "Non-Delegated Custody: Total digital sovereignty. We provide the hardened infrastructure; you retain absolute and exclusive control of the keys.",

            infra_mod: "MODULE 02 // FORTIFICATION ENGINEERING",
            infra_label: "02. THE SHELL & ACCESS",
            infra_title: "Armored Perimeter.",
            infra_desc: "Bespoke engineering centered on the **FPB-70** and **PF-70** series. Our grade-bank access points and modular shells provide a certified physical firewall against any kinetic, thermal, or ballistic threat.",
            hw_1_name: "Modular Vault FRN",
            hw_1_cert: "Grade IV-XI (EN 1143-1)",
            hw_1_desc: "High-density composite panels with metallic reinforcement. Monolithic welded shell for elite lounges.",
            hw_2_name: "Titan Gates / PF-70",
            hw_2_cert: "Banking Grade",
            hw_2_desc: "600mm multilayered shielding with multi-directional locking and identity verification integration.",
            hw_3_name: "FPB-70 Series",
            hw_3_cert: "RC5 / FB4 Certified",
            hw_3_desc: "Dual protection: Anti-theft (RC4/RC5) and Ballistic (FB2/FB4) for VIP event rooms and sanctuaries.",

            matrix_mod: "MODULE 03 // CUSTODY INFRASTRUCTURE",
            matrix_label: "03. THE CORE (SECURITY BOX POINTS)",
            matrix_title: "Autonomous Hubs.",
            matrix_desc: "Smart biometric lockers designed for the 'Sovereignty of Wealth'. Autonomous management ensures that the client owns the security while the host provides the fortress.",
            matrix_item_1: "Smart Lockers (S): Optimized for hardware wallets and seed backups with internal USB/220V charging ports.",
            matrix_item_2: "The Portfolio (M/XL): Grade B reinforced compartments (UNE 108115) for gold bullion, rare art, and server nodes.",
            matrix_item_3: "FMX ACS Ecosystem: Facial/Palm-vein recognition protocols eliminating human intervention from the host staff.",
            matrix_robotic: "Non-Custodial Operational Logic: VaultBit provides the 'Iron' and 'Biometrics'; you retain the absolute sovereignty of your assets.",

            phantom_mod: "MODULE 04 // THE SANCTUARY",
            phantom_label: "04. STEALTH LUXURY",
            phantom_title: "The Panic Sanctuary.",
            phantom_desc: "Transformation of premium real estate into certified high-security sanctuaries. Invisible fortification integrated into mahogany, leather, and noble metals.",
            phantom_1_title: "Stealth Integration",
            phantom_1_desc: "Camouflaged acousted/armored systems in executive desks and furniture. Luxury without security compromises.",
            phantom_2_title: "Structural Auditing",
            phantom_2_desc: "Professional load-bearing analysis for high-density modular systems (FRN) in existing 5-star hotel suites.",

            neural_mod: "MODULE 05 // IDENTITY ECOSYSTEM",
            neural_label: "05. THE NEURAL KEY",
            neural_title: "Biometric Identity.",
            neural_desc: "Your identity is the only mathematical key to the Lounge. VaultBit and the Host Institution hold zero-knowledge of your assets or access logs.",
            neural_item_1: "Palm-Vein & Identity Scanning: Multi-modal authentication ensuring only authorized 'Vault Session' members enter.",
            neural_item_2: "Zero-Knowledge Logs: Audit trails verified without visibility of who accessed what or what is stored.",

            legal_mod: "MODULE 06 // LEGAL FIREWALL",
            legal_label: "06. COMPLIANCE & FRAMEWORK",
            legal_title: "Operational Shielding.",
            legal_desc: "VaultBit Capital Lounge S.L. operates strictly under **Management Consultancy (IAE 7022)** and **Machinery Intermediation (IAE 4614)**.",
            legal_p1: "<strong>Infrastructure Provider:</strong> We are the 'Engineers of Fortification'. The Host Partner retains ownership of the assets.",
            legal_p2: "<strong>Lease Model:</strong> VBCL is NOT a depositary (Art. 1758 CC). We provide the lease of functional high-security spaces.",
            legal_p3: "<strong>Seguridad Delegada:</strong> La vigilancia perimetral activa la provee el partner mediante Empresas de Seguridad (ESP) certificadas.",
            legal_p4: "<strong>Estándares de Soberanía:</strong> Adhesión voluntaria a protocolos de identificación y AML para tranquilidad institucional.",

            roi_mod: "TERMINAL // PARTNER MODEL",
            roi_title: "Strategic Asset Performance.",
            roi_desc: "Transform unproductive square meters into elite recurrent revenue nodes. Position your establishment as a strategic hub for global UHNW capital.",
            roi_subdesc: "Increase intrinsic property value immediately through Grade IV certified modular installations and exclusive 'Vault Sessions' orchestration.",
            roi_stat_1: "Asset Revaluation",
            roi_stat_2: "UHNW Attraction",
            roi_stat_3: "Launch B2B Audit",

            footer_h2_1: "Architecting",
            footer_h2_2: "The Future of Sovereignty.",
            footer_cta: "SOLICITE DOSSIER B2B",
            footer_l_1: "Compliance",
            footer_l_2: "KYC Protocol",
            footer_l_3: "Privacy Policy",
            footer_l_4: "Technical Certifications",
            footer_mod: "TERMINAL // INTERFACE",

            modal_title: "B2B SPATIAL AUDIT REQUEST",
            f_name: "NAME",
            p_name: "Full Name",
            f_company: "INSTITUTION / COMPANY",
            p_company: "Entity Name",
            f_email: "CORPORATE EMAIL",
            p_email: "id@institution.com",
            f_phone: "TELEPHONE",
            p_phone: "+XX 000 000 000",
            f_message: "SPECIFIC REQUIREMENTS / MESSAGE",
            p_message: "Briefly describe the infrastructure site or expected lounge capacity...",
            f_submit: "SUBMIT AUDIT REQUEST",
            f_success: "TRANSMISSION SUCCESSFUL. DATA SYNCED.",
            f_error: "TRANSMISSION ERROR. RETRY LATER."
        },
        es: {
            nav_model: "01. La Experiencia",
            nav_services: "02. El Blindaje",
            nav_hardware: "03. El Núcleo",
            nav_compliance: "04. Cortafuegos",
            nav_cta: "SOLICITAR AUDITORÍA",

            hero_mod: "MÓDULO 00 // INICIALIZACIÓN",
            hero_est: "EST. 2026 — INFRAESTRUCTURA OPERADA DESDE SUIZA",
            hero_h1_1: "VaultBit",
            hero_h1_2: "Capital Lounge.",
            hero_h1_3: "Arquitectura de la Soberanía.",
            hero_desc: "Ingeniamos entornos B2B de alta seguridad donde la soberanía digital se une a la discreción física. Transformamos activos inmobiliarios en Lounges de trading y nodos de eventos 'The Vault Sessions'.",
            hero_cta_primary: "INICIAR AUDITORÍA",
            hero_cta_secondary: "CATÁLOGO DE LOUNGES",

            vp_mod: "MÓDULO 01 // EL LOUNGE INSTITUCIONAL",
            vp_label: "01. LA EXPERIENCIA",
            vp_title: "Conocimiento y <br> Networking de Élite.",
            vp_desc: "VaultBit redefine el valor espacial mediante 'The Vault Sessions' — un ecosistema exclusivo para individuos UHNW que incluye charlas de inversión, mentoría en herencia digital y networking institucional dentro de un perímetro fortificado.",
            vp_item_1: "Santuarios de Trading: Terminales 'Self-Service' con redes encriptadas independientes y Security Box Points.",
            vp_item_2: "The Vault Sessions: Eventos de networking y orquestación de legado para la élite criptetaria global.",
            vp_item_3: "Custodia No-Delegada: Soberanía digital total. Proveemos la infraestructura blindada; usted retiene el control absoluto de las llaves.",

            infra_mod: "MÓDULO 02 // INGENIERÍA DE FORTIFICACIÓN",
            infra_label: "02. EL PERÍMETRO Y ACCESO",
            infra_title: "Malla Blindada.",
            infra_desc: "Ingeniería a medida centrada en las series **FPB-70** y **PF-70**. Nuestros puntos de acceso de grado bancario y cámaras modulares proporcionan un cortafuegos físico certificado contra amenazas térmicas y mecánicas.",
            hw_1_name: "Cámara Modular FRN",
            hw_1_cert: "Grado IV-XI (EN 1143-1)",
            hw_1_desc: "Paneles de composite de alta densidad con armaduras metálicas. Cámaras monolíticas para entornos de alta seguridad.",
            hw_2_name: "Titan Gates / PF-70",
            hw_2_cert: "Grado Bancario",
            hw_2_desc: "Blindajes de hasta 600mm con sistemas de bloqueo multidireccional e integración biométrica.",
            hw_3_name: "Serie FPB-70",
            hw_3_cert: "RC5 / FB4 Certificado",
            hw_3_desc: "Protección dual: Antirrobo (RC4/RC5) y Antibalas (FB2/FB4) para salas de eventos VIP y santuarios.",

            matrix_mod: "MÓDULO 03 // INFRAESTRUCTURA DE CUSTODIA",
            matrix_label: "03. EL NÚCLEO (SECURITY BOX POINTS)",
            matrix_title: "Hubs Autónomos.",
            matrix_desc: "Lockers biométricos inteligentes diseñados para la 'Soberanía de la Riqueza'. La tecnología de VaultBit garantiza que el cliente es el dueño de la seguridad.",
            matrix_item_1: "Security Box Points (S): Optimizados para carteras hardware con tomas de carga USB/220V interiores.",
            matrix_item_2: "The Portfolio (M/XL): Compartimentos reforzados Grado B (UNE 108115) para lingotes, arte y nodos de servidores.",
            matrix_item_3: "Ecosistema FMX ACS: Reconocimiento facial y de vena de palma que elimina la intervención humana del personal del hotel.",
            matrix_robotic: "Lógica Operativa No-Custodial: VaultBit provee el 'hierro' y la biometría; usted retiene la soberanía absoluta de sus activos.",

            phantom_mod: "MÓDULO 04 // EL SANTUARIO",
            phantom_label: "04. STEALTH LUXURY",
            phantom_title: "El Refugio Patrimonio.",
            phantom_desc: "Transformación de activos inmobiliarios en santuarios certificados. Fortificación invisible integrada en maderas nobles, cueros y metales.",
            phantom_1_title: "Integración Stealth",
            phantom_1_desc: "Sistemas blindados camuflados en mobiliario ejecutivo y suites. Lujo sin concesiones en seguridad pasiva.",
            phantom_2_title: "Auditoría de Carga",
            phantom_2_desc: "Evaluación técnica de forjados para soportar infraestructura pesada modular (Serie FRN) en suites presidenciales.",

            neural_mod: "MÓDULO 05 // ECOSISTEMA DE IDENTIDAD",
            neural_label: "05. LA LLAVE NEURAL",
            neural_title: "Identidad Biométrica.",
            neural_desc: "Su identidad es la única llave matemática al Lounge. VaultBit y la Institución Host no tienen conocimiento de sus activos.",
            neural_item_1: "Vena de Palma e Iris: Autenticación multi-modal que garantiza que solo miembros de 'The Vault Sessions' accedan.",
            neural_item_2: "Logs Zero-Knowledge: Trazabilidad de auditoría sin visibilidad del contenido ni del propósito del acceso.",

            legal_mod: "MÓDULO 06 // CORTAFUEGOS LEGAL",
            legal_label: "06. CUMPLIMIENTO Y MARCO LEGAL",
            legal_title: "Blindaje Operativo.",
            legal_desc: "VaultBit Capital Lounge S.L. opera estrictamente como <strong>Consultoría de Gestión (IAE 7022)</strong> e <strong>Intermediación de Maquinaria (IAE 4614)</strong>.",
            legal_p1: "<strong>Proveedor de Infraestructura:</strong> Somos los 'Arquitectos de Fortificación'. El Host Partner retiene la propiedad de los activos.",
            legal_p2: "<strong>Modelo de Arrendamiento:</strong> VBCL NO es depositario (Art. 1758 CC). Proveemos arrendamiento de espacios físicos funcionales.",
            legal_p3: "<strong>Seguridad Delegada:</strong> La vigilancia perimetral activa la provee el partner mediante Empresas de Seguridad (ESP) certificadas.",
            legal_p4: "<strong>Estándares de Soberanía:</strong> Adhesión voluntaria a protocolos de identificación y AML para tranquilidad institucional.",

            roi_mod: "TERMINAL // MODELO PARTNER",
            roi_title: "Rendimiento del Activo Estratégico.",
            roi_desc: "Convierta metros cuadrados improductivos en nodos de ingresos recurrentes de élite. Posicione su establecimiento como un nodo UHNW.",
            roi_subdesc: "Revalorización inmediata del activo inmobiliario mediante instalaciones certificadas Grado IV y orquestación de 'Vault Sessions'.",
            roi_stat_1: "Revalorización Activo",
            roi_stat_2: "Atracción UHNW",
            roi_stat_3: "Iniciar Auditoría B2B",

            footer_h2_1: "Arquitectando el",
            footer_h2_2: "Futuro de la Soberanía.",
            footer_cta: "SOLICITAR DOSSIER B2B",
            footer_l_1: "Cumplimiento",
            footer_l_2: "Protocolo KYC",
            footer_l_3: "Política de Privacidad",
            footer_l_4: "Certificaciones Técnicas",
            footer_mod: "TERMINAL // INTERFAZ",

            modal_title: "SOLICITUD DE AUDITORÍA B2B",
            f_name: "NOMBRE",
            p_name: "Nombre Completo",
            f_company: "INSTITUCIÓN / EMPRESA",
            p_company: "Nombre de la Entidad",
            f_email: "CORREO CORPORATIVO",
            p_email: "id@institution.com",
            f_phone: "TELÉFONO",
            p_phone: "+XX 000 000 000",
            f_message: "REQUERIMIENTOS ESPECÍFICOS",
            p_message: "Describa brevemente el sitio de infraestructura o capacidad esperada del lounge...",
            f_submit: "ENVIAR SOLICITUD",
            f_success: "TRANSMISIÓN EXITOSA. DATOS SINCRONIZADOS.",
            f_error: "ERROR EN LA TRANSMISIÓN. REINTENTE LUEGO."
        }
    };

    // Initialization
    const defaultLang = localStorage.getItem('vb_lang') || 'en';
    setLanguage(defaultLang);
    window.setLanguage = setLanguage;

    function setLanguage(lang) {
        if (!dictionary[lang]) return;
        localStorage.setItem('vb_lang', lang);

        // Update content
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[lang][key]) {
                el.innerHTML = dictionary[lang][key];
            }
        });

        // Update placeholders
        const inputs = document.querySelectorAll('[id]');
        inputs.forEach(input => {
            const pKey = 'p_' + input.id;
            if (dictionary[lang][pKey]) {
                input.placeholder = dictionary[lang][pKey];
            }
        });

        document.querySelectorAll('.lang-opt').forEach(opt => {
            if (opt.textContent.toLowerCase() === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
        document.documentElement.lang = lang;
    }
});
