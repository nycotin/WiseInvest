import Button from 'react-bootstrap/Button';

function ForkPage () {
    return (
    <>
        <div className="fork-page">
             <div className="buttons">
                <Button variant="secondary" href="/education">Education Center</Button>
                <Button variant="secondary" href="/invest">Investments Manager</Button>
            </div>
        </div>
    </>
  )
}

export default ForkPage