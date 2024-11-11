(() => {

// console.log('jdunk: inside content_script.js')

function onJobListMutation(mutationList, observer) {
  // console.log('jdunk: MUTATION event ++++++++++++++++++++++')
  // console.log('mutationList', mutationList.length)
  hideRejectedJobs()
}

function getJobListNode() {
  return document.querySelector('[data-test="job-tile-list"]')
}

function hideRejectedJobs() {
  const jobList = getJobListNode()
  // console.log({ jobList })
  
  let allJobs, rejectedJobs
  allJobs = Array.from(document.querySelectorAll('section.air3-card-section.air3-card-hover')).filter(el => el.querySelector('.job-tile-actions') )
  // console.log({allJobs})
  rejectedJobs = allJobs.filter(el => { const child = el.querySelector('.job-tile-actions'); return child.style.display === 'none'; })
  // console.log({rejectedJobs})
  rejectedJobs.forEach(e => e.style.display = 'none')
}

function onWindowLoad() {
  // console.log('jdunk: ON WINDOW LOAD ************')

  hideRejectedJobs()

  const mutationConfig = { attributes: false, childList: true, subtree: false };

  const observer = new MutationObserver(onJobListMutation);
  observer.observe(getJobListNode(), mutationConfig);
}

window.addEventListener("load", onWindowLoad)
})()