## TechSCOrangepi

## Description
This project is the Node-Red project we use on Orangepi. It works with the others repos TechSCPhone and TechSCBase. This one handle all we need for orangepi and gpio and the other one handle our phone
This setup is needed to be a full portative solar powered 5V Dolibarr with net connectivity via 3G than can be prodvide by phone.

## Pourquoi ce projet ?
 - Avoir une appication de gestion d'activité qui répond au contrainte suivantes
 - Etre le moins ohnareux posible
 - Être heberger en local pour préserver les donées
 - Etre nomade
 - Etre accesible
 - Etre performant

## Les choix fait pour respecter ces contraintes
 - Pour être le moins ohnéreux possible, nous utilisont au maximun des outils open source, le seul je crois ce sera windows evidement
 - Pour préserver les données nous utilisons des application uniquement héberger sur des machines en notre possesion physique
 - Pour être le plus nomade, les matériels nécessaire sont un téléphone et un orangepi ainsi tout est alimentable via une battery solaire portative de téléphone
 - Pour être le plus accéssible, nous privilégions l'utilisation d'outils visuel pour tout ce que nous pouvons, disons que c'esst la voie des nodes
 - Pour être le plus performant nous utilisons un ensemble de trois machines différentes. 
    - Le téléphone pour les capteurs, la XG, et le telephone evidement
    - L'orangepi pour les GPIO et être le cerveau pour ne pas trop impacter notre téléphone, principal outil de communication avec l'extérieur
    - Le PC pour profiter de la plus grande puissance de calcul que nous avons tous

## Le point de départ
 - Node-Red installer sur chaque des machines
 - Le mode projet de Node-Red, avec sur chaqune des machines, le projet correspondant cloner
 - Tout est en priorité controllé par le project TechSCOrangepi
 - Le téléphone sert d'interface prioritaire pour controllé l'orangePi via ssh même si j'utilise la plupart du temps mon PC

## Quelques choix de contraintes technnique sur l'utilisation et la sélection des outils
 - Nous privilégions toujours une mise à disposition d'application dans le navigateur internet
 - Si ce n'est pas possible, nous privilégions toujours des mise à disposition d'application par docker et non via une installation directe sur la machine. Expecté lorsque nous avons besoin de ces capacité physique comme les capteurs du téléphone. Pour cette raison les Node-Red doivent être installer sur la machine
 - Nous utilisons visual studio code pour la programmation classique car il dispose de la meilleur intellisense et de plein de module interessant
 - Nous privilégions l'utilisations de flow Node-Red plutôt que des programmes écrit en ligne code avec Visual Studio Code
 - Nous priligions l'utilisations des nodes développer par la communauté. Cependant elle doivent être dynamiquement paramétrable via des propriété du message
 - Nous privilégions la création de subflows à la création de node spécifique disponible via npm.
 - Nous utilsons un méthodologie de construction de ces subflows particulière afin de garantir un compréhension d'utilisation et une maintenance simplifier
 - Nous utiliserons de manière général plusieur outils pour faire la même chose de manière différentes en fonction de nos compétences et du temps qui est nécessaire pour l'apprendre et le metrre en place. On ne cherche pas forcément à exploiter completement un outil mais plutôt à s'adapter suivant un panel de contrainte d'utilisation
 - Nous nous efforçons de develloper des fonctionalité accesible de trois manière
    - Avec la voix
    - Avec une interace graphique
    - Avec une requete http     
 - Nous somme kaizen à fond alors dans ce project nous allons travailler sur quelque chose et jamais le finir complétement pour passer à une autre. Par contre, nous allons avancé jusqua quelque chose de fonctionnel à chaque fois. C'est à dire entre 60 et 70% du job

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
 - Jusqu'au 25/07/2022 publication des vidéos d'essaies pour me familiariser avec la méthode de travail
 - A partir du 26/07/2022 publication à un rythmes régulier soutenable. A ce stade je pense un vidéo tous les 2 jours
 - Deux semaine plus tard réalisation des premier essaie de live pour le support et la récolte d'informations par les viewers pour dévelloper mes compétences

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
