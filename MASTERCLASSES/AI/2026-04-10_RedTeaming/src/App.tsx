import { useState, useEffect } from 'react'
import './App.css'
import { 
  Shield, 
  Target, 
  Code2, 
  Brain, 
  ExternalLink, 
  FileText, 
  MessageSquare, 
  Zap,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Navigation
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

function App() {
  const [activeSection, setActiveSection] = useState('intro')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'block1', 'block2', 'block3', 'takeouts', 'karpathy']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Fixed Navigation */}
      <nav className="nav-fixed">
        <div className="presentation-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-500" />
              <span className="text-xl font-bold">RED TEAM Masterclass</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              {[
                { id: 'intro', label: 'Введение', icon: Target },
                { id: 'block1', label: 'Блок 1', icon: MessageSquare },
                { id: 'block2', label: 'Блок 2', icon: Brain },
                { id: 'block3', label: 'Блок 3', icon: Code2 },
                { id: 'takeouts', label: 'Takeouts', icon: CheckCircle },
                { id: 'karpathy', label: 'Karpathy', icon: Lightbulb },
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={activeSection === id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => scrollToSection(id)}
                  className={activeSection === id ? 'bg-red-500 hover:bg-red-600' : ''}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        {/* Introduction Section */}
        <section id="intro" className="presentation-container mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-red-400 border-red-400/50 text-lg px-4 py-1">
              <Shield className="w-4 h-4 mr-2" />
              Master Class
            </Badge>
            <h1 className="present-title mb-6">
              <span className="text-red-500">RED TEAM</span> для LLM
            </h1>
            <p className="present-subtitle max-w-3xl mx-auto">
              Критический анализ и adversarial подходы к работе с большими языковыми моделями
            </p>
          </div>

          <Card className="bg-slate-900/50 border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="w-6 h-6 text-red-500" />
                Цель мастер-класса
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="present-text text-slate-300">
                Продемонстрировать <span className="highlight-red">важную роль критического анализа (RED TEAMING)</span> в процессе взаимодействия с LLM, а также поделиться промптами для RED TEAMing.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <Zap className="w-3 h-3 mr-1" />
                  NotebookLM
                </Badge>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <Brain className="w-3 h-3 mr-1" />
                  KIMI Multi-Agent
                </Badge>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <Code2 className="w-3 h-3 mr-1" />
                  CURSOR IDE
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Block 1 */}
        <section id="block1" className="presentation-container mb-16">
          <div className="section-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="block-badge">1</div>
              <div>
                <h2 className="present-heading mb-2">NotebookLM + RED TEAM</h2>
                <p className="text-slate-400">Использование RED TEAM как кастомного системного промпта для уточнения концепции</p>
              </div>
            </div>

            <Card className="bg-slate-800/30 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  Контекст задачи: The Tuning Layer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Сергей Меркулов поставил задачу перехода от использования Gemini к использованию opensource моделей с LORA адаптерами, которые обеспечили бы независимость от инфраструктуры Google и более дешевый inference с минимальной потерей качества.
                </p>
                <p className="text-slate-400 text-sm">
                  Параллельно этой задаче занимается Максим. Ниже — его комментарии о "болях" и проблемах:
                </p>
              </CardContent>
            </Card>

            <div className="quote-box mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Комментарии Максима: Вызовы при файнтюне LLM
              </h3>
              <ScrollArea className="h-96 rounded-lg">
                <div className="code-block text-slate-300">
                  <pre>{`Основные вызовы при файнтюне LLM в данный момент можно разделить на три большие части, которые как бы вытекают одна из другой:

1) Данные

Текущее обучение моделей можно грубо разбить на два подраздела, относительно используемых данных: обучение новым знаниям и обучение новым умениям. В связи с этим возникают следующие вызовы:

1.1) При обучении новым знаниям легко столкнуться с тем, что достаточно умные модели уже видели практически все, что мы можем им показать. Как пример: Qwen3.5-35B-A3B уже отлично осведомлен о существовании русских клинических рекомендаций и может ссылаться на них "из коробки". Таким образом мы можем попробовать "закрепить" его знания, но результат трудно проверять.

1.2) При обучении новым умениям требуются очень качественные датасеты, сбор которых может быть болью. Без "органических" данных по факту получается дистилляция модели, которая генерирует датасет. Из-за этого ошибка накапливается и результат на реальных данных может сильно отличаться от метрик при обучении. Пример: обучение LLM-NER на синтетических данных от Алины (про сам процесс генерации синтетики лучше уточнить у самой Алины). По метрикам модель получилась адекватная, по факту иногда не отличает врача от пациента на реальных данных.

2) Архитектуры

Огромное количество архитектур, "субархитектур" моделей и алгоритмов обучения. Глобально идея обучения не меняется: есть модель, есть данные, показываем новые данные модели, алгоритм подстраивает под них веса. Но по факту получается не так просто: архитектуры моделей меняются на лету даже в рамках одной компании: алгоритм для Qwen3 может не подойти для Qwen3.5. Шаблоны сообщений Llama3 абсолютно другие, чем у Llama2. Приходится сидеть и долго думать, что сломало модель на этот раз: не тот chat_template или не тот пайплайн обучения. Пример: при обучении Llama3-Guardrails следуя официальной документации, я выбрал формат данных, оказавшийся устаревшим, в результате модель начинала генерировать полную чушь, если использовать ее не через сырой transformers.

Унификацией обучения под разные архитектуры занимается проект Unsloth. Но для этого им пришлось создать свою "субархитектуру". Получилась ситуация, что можно использовать единый пайплайн для обучения моделей, но при условии, что команда Unsloth заранее подготовила конкретную модель. Но и это не панацея, так как помимо архитектур есть еще и целый зоопарк подходов к обучению: SFT, GRPO, RL и т.д. Для каждой задачи нужен свой подход. Это нужно для того, чтобы "прокачать" конкретную способность модели: reasoning, tool_call, QA и т.п. Но неосторожная работа с алгоритмом может привести к тому, что какие-то части модели сломаются: при SFT может отвалиться reasoning или tool_call, при GRPO может прокачаться reasoning, но сломаться vision и тому подобное. Пример: при обучении Ministral 3 8B новым знаниям через SFT, отваливается tool call.

3) Железо

Из-за обилия архитектур и "субархитектур" моделей становится трудно оценивать затраты по железу для обучения. Нет жесткого правила "Модель X параметров потребует Y памяти и Z времени на Q токенов". Это возникает из-за того, что "чистые" модели учить не выгодно. Лучшие соотношения цена/качество дает обучение квантованных моделей. Но квантование сильно зависит от архитектуры. Пример: модели от LiquidAI не квантуются из-за собственных архитектурных ограничений, следовательно модель LFM2-8B-A1B обучить заметно сложнее, чем Qwen3.5-9B. Поэтому нет возможности получить четкий ответ "Обучится ли модель X на железе Y". Также нужно учитывать, что разные задачи требуют разного размера контекста. Из-за этого оказывается, что, например, формально Qwen3.5-35B-A3B обучается на A100, но все, что сложнее 2048 токенов (промпт + ответ) уже не помещается в VRAM при обучении, а это сильно ограничивает возможности.`}</pre>
                </div>
              </ScrollArea>
            </div>

            <Card className="bg-slate-800/30 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Демонстрация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300">
                  <strong className="text-white">Задача:</strong> Не выполняя вызова LLM, показать как использовать RED TEAM в качестве кастомного системного промпта в NotebookLM.
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Сохранить комментарии Максима в отдельном файле в базе знаний</li>
                  <li>Попросить NotebookLM проанализировать соответствие разработанной концепции продукта требованиям пользователей</li>
                </ul>
              </CardContent>
            </Card>

            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-red-400" />
                Полезные ресурсы
              </h3>
              <a 
                href="https://notebooklm.google.com/notebook/03b40f71-6a25-422c-951c-5013665bc7b8"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link external-link mb-3 block"
              >
                NotebookLM: The Tuning Layer Concept
              </a>
              <a 
                href="https://share.note.sx/1pmbsvg5#+2isKfYKIh1qzgesi4Wq0zxMQ00TCI7ChFRgk428ffE"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link external-link block"
              >
                AutoHotkey для ускорения использования RED TEAM промптов
              </a>
            </div>
          </div>
        </section>

        {/* Block 2 */}
        <section id="block2" className="presentation-container mb-16">
          <div className="section-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="block-badge">2</div>
              <div>
                <h2 className="present-heading mb-2">KIMI: Multi-Agent RED TEAM</h2>
                <p className="text-slate-400">Агентская версия RED TEAM с использованием web search и агентов</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-slate-800/30 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                    Запрос для NotebookLM
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block text-slate-300">
                    <pre>{`Подготовь Elevator pitch по проекту The Tuning Layer с фокусом на глобальный рынок`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    Запрос к KIMI (Multi-Agent)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block text-slate-300">
                    <pre>{`Прилагается документ Strategic Vision платформы TheTuningLayer. 
Также прилагаю текст Elevator Pitch.

Пожалуйста проведи анализ качества "Elevator Pitch". 
Используй протокол RED TEAM "Multi-Agentic Red Team & Adversarial Audit Council Master Prompt". 
Затем исправь "Elevator Pitch" на основании рекомендаций RED TEAM`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/30 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-400" />
                  Ответ NotebookLM: Elevator Pitch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80 rounded-lg">
                  <div className="code-block text-slate-300">
                    <pre>{`**The Tuning Layer** — это B2B-платформа оптимизации больших языковых моделей (LLM) формата «Результат как услуга» (Result-as-a-Service), созданная для глобального Enterprise-рынка.

**Проблема:** Сегодня корпоративный ИИ застрял на этапе перехода от прототипов к масштабному развертыванию из-за трех барьеров:

1. **Астрономические затраты на инференс:** Генерация ответов тяжелыми моделями (70B+) или ИИ-агентами съедает 55–85% бюджета проектов.
2. **Дефицит кадров:** Создание in-house команды MLOps для самостоятельной оптимизации моделей стоит в технологических хабах Европы более €300,000 в год, что лишает оптимизацию экономической целесообразности.
3. **«Слепота качества» (Quality Blindness):** Крупный бизнес боится делегировать критические процессы (страхование, логистика, финансы) компактным моделям без измеримых гарантий того, что они не будут галлюцинировать.

**Наше решение:** The Tuning Layer автоматизирует замену дорогих общих моделей на компактные (8-14B) специализированные адаптеры, **снижая затраты на инференс в 3–5 раз** при сохранении качества на уровне базовых гигантов. Клиенту не нужны свои ML-инженеры: он предоставляет данные, а получает готовую развернутую модель.

**Ключевые технологические преимущества:**

- **Масштабируемая «Фабрика обучения»:** Благодаря автономному движку AutoResearch Loop, **всего один наш ML-инженер может вести 30–40 клиентских проектов одновременно**, заменяя собой целый штат MLOps-специалистов.
- **Trust Layer и математические гарантии:** Мы решаем проблему страха галлюцинаций через SLA Gateway на базе методологии QWorld. Платформа выдает клиенту юридически значимый отчет (Exhibit A), который математически доказывает, что **деградация качества модели составляет менее 0.5%**.
- **Абсолютная защита данных (Zero-Trust):** Модуль локальной деидентификации (DDM) и возможность развертывания полностью в контуре клиента (BYOC) снимают любые возражения CISO и автоматически решают проблемы соответствия GDPR, HIPAA и будущему EU AI Act.

**Рынок и конкурентное отличие:** На пересечении рынков LLM Fine-Tuning и Managed AI Inference формируется TAM объемом около $21 млрд с ростом до $52 млрд к 2028 году. В то время как конкуренты вроде Predibase или Together AI предлагают PaaS-решения _для инженеров_, **мы являемся единственным игроком, предоставляющим готовый результат предприятиям, у которых нет ML-экспертов**.

**Стратегия и Экзит:** Наш GTM-план строится на партнерстве с крупными IaaS-провайдерами (например, Nebius), для которых мы становимся слоем оптимизации, удерживающим их Enterprise-клиентов от оттока из-за дороговизны вычислений. Платформа с первой строчки кода **спроектирована под стратегическое слияние и поглощение (M&A)** облачными гигантами на горизонте 18-24 месяцев, предлагая API-first архитектуру, чистую лицензионную политику (Apache 2.0) и базу проприетарной отраслевой таксономии.`}</pre>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-red-400" />
                Полезные ресурсы
              </h3>
              <a 
                href="https://www.kimi.com/chat/19d76707-6072-87ee-8000-09f993bd8ad5?chat_enter_method=new_chat"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link external-link mb-3 block"
              >
                Ответ KIMI (Multi-Agent RED TEAM Analysis)
              </a>
              <a 
                href="https://share.note.sx/zulj5suj#B76m7NObWdu2RB4lGyM7bnQ5JmEi27lzWnCjIQJjvQg"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link external-link block"
              >
                Промпты для RED TEAM (включая multi-agentic версию и версию для Cursor)
              </a>
            </div>
          </div>
        </section>

        {/* Block 3 */}
        <section id="block3" className="presentation-container mb-16">
          <div className="section-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="block-badge">3</div>
              <div>
                <h2 className="present-heading mb-2">CURSOR IDE + RED TEAM</h2>
                <p className="text-slate-400">Интеграция RED TEAM в процесс разработки</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-slate-800/30 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                    Демонстрация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <ChevronRight className="w-4 h-4 text-red-400" />
                    <span>Прототип TheTuningLayer Studio</span>
                  </div>
                  <div className="code-block text-slate-400 text-sm">
                    <pre>http://localhost:8501</pre>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <ChevronRight className="w-4 h-4 text-red-400" />
                    <span>Выгрузка из Langfuse (с комментариями)</span>
                  </div>
                  <div className="code-block text-slate-400 text-sm">
                    <pre>C:\Users\Alexey\Downloads\2026-04-10_runs</pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    CURSOR на стероидах
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-cyan-500/20 text-cyan-400 mt-1">1</Badge>
                    <div>
                      <p className="text-slate-200 font-medium">CodeGraphContext MCP server</p>
                      <p className="text-slate-400 text-sm">Расширенный контекст кода</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-cyan-500/20 text-cyan-400 mt-1">2</Badge>
                    <div>
                      <p className="text-slate-200 font-medium">.cursor\rules</p>
                      <p className="text-slate-400 text-sm">Стеринговые правила и агенты</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-400" />
                  Рабочая директория
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block text-slate-300">
                  <pre>{`\\wsl.localhost\Ubuntu\home\alexey\projects\benchmarking-finetuning\_DEVELOPMENT`}</pre>
                </div>
                <p className="text-slate-400 mt-3 text-sm">
                  Демонстрация работы над исправлением выгрузки из Langfuse с использованием RED TEAM подхода
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Takeouts Section */}
        <section id="takeouts" className="presentation-container mb-16">
          <div className="section-card border-red-500/30">
            <div className="flex items-center gap-4 mb-8">
              <CheckCircle className="w-10 h-10 text-red-500" />
              <h2 className="present-heading">Ключевые выводы (TAKEOUTS)</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="takeout-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/30 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">RED TEAM — необходимость</h3>
                    <p className="text-slate-300">
                      Критический анализ выводов LLM не является опцией, а становится обязательным элементом при работе с важными задачами. Модели склонны к галлюцинациям и поверхностным выводам.
                    </p>
                  </div>
                </div>
              </div>

              <div className="takeout-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">NITL: Navigator In The Loop</h3>
                    <p className="text-slate-300">
                      <span className="highlight-yellow">RED TEAM нужно аугментировать экспертной навигацией</span>. Автоматический adversarial анализ требует направления со стороны эксперта, который понимает контекст и может интерпретировать результаты.
                    </p>
                  </div>
                </div>
              </div>

              <div className="takeout-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Multi-Agent усиливает анализ</h3>
                    <p className="text-slate-300">
                      Использование нескольких агентов с разными ролями (критик, аудитор, эксперт) позволяет выявить больше проблемных мест и получить более глубокий анализ.
                    </p>
                  </div>
                </div>
              </div>

              <div className="takeout-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/30 flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Интеграция в workflow</h3>
                    <p className="text-slate-300">
                      RED TEAM должен быть интегрирован в рабочий процесс: от NotebookLM для концепций до CURSOR для кода. Hotkeys и шаблоны ускоряют применение.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-red-500/20" />

            <div className="bg-slate-800/50 rounded-xl p-6 border border-red-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                Главный инсайт
              </h3>
              <p className="text-lg text-slate-200 leading-relaxed">
                RED TEAM — это не замена экспертизе, а <span className="highlight-red">инструмент усиления экспертизы</span>. 
                Без NavigatorInTheLoop (NITL) даже самый продвинутый adversarial анализ может уйти в непродуктивное направление 
                или пропустить критически важные контекстные нюансы. Эксперт направляет, LLM исполняет.
              </p>
            </div>
          </div>
        </section>

        {/* Karpathy Section */}
        <section id="karpathy" className="presentation-container mb-16">
          <div className="section-card">
            <div className="flex items-center gap-4 mb-6">
              <Lightbulb className="w-10 h-10 text-amber-400" />
              <h2 className="present-heading">Andrey Karpathy: Personal Knowledge Base</h2>
            </div>

            <Card className="bg-slate-800/30 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-amber-400" />
                  Источник
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link external-link text-lg"
                >
                  karpathy.github.io: Personal Knowledge Base
                </a>
              </CardContent>
            </Card>

            <div className="quote-box mb-6">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Краткое описание идеи</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Andrey Karpathy предлагает концепцию <span className="highlight-yellow">персональной базы знаний</span>, 
                которая агрегирует всю информацию, с которой человек взаимодействует: заметки, прочитанные статьи, 
                переписки, код, закладки и т.д.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                Ключевая идея — создать <strong className="text-white">единый searchable индекс</strong> всего, 
                что вы когда-либо читали или писали, с возможностью быстрого извлечения контекста через LLM.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Это позволяет не терять информацию, быстро находить релевантный контекст из прошлого опыта 
                и эффективно использовать накопленные знания в текущей работе.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-amber-500/10 to-red-500/10 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Как это оптимизирует работу
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 italic">
                  [Здесь вы расскажете, как именно идея Karpathy помогает в вашей работе — 
                  возможность быстро находить ранее изученный материал, не дублировать исследования, 
                  поддерживать непрерывность контекста между проектами и т.д.]
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="presentation-container text-center text-slate-500">
          <Separator className="mb-8 bg-slate-800" />
          <p className="text-lg">RED TEAM Masterclass | The Tuning Layer</p>
        </footer>
      </main>
    </div>
  )
}

export default App
