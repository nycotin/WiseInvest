import Button from 'react-bootstrap/Button';

function ForkPage () {
    return (
    <>
        <div className="fork-page">
            <h1>Choose the area you want to access</h1>
             <div className="buttons">
                <Button variant="secondary" href="/education">Education Center</Button>
                <Button variant="secondary" href="/invest">Investments Manager</Button>
            </div>
        </div>
    </>
  )
}

export default ForkPage