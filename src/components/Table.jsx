const Table = () => {
  return (
    <div>
      {/* 
      <div className="w-full max-w-4xl mx-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">
                Plot Fidelity
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Character Fidelity
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Themes and Messages
              </th>
              <th className="border border-gray-400 px-4 py-2">Casting</th>
              <th className="border border-gray-400 px-4 py-2">
                Setting and World-Building
              </th>
            </tr>
          </thead>
          <tbody>
            {adaptation.tableData &&
              adaptation.tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <EditableTableCell
                      key={`${rowIndex}-${colIndex}`}
                      initialValue={cell}
                      onSave={(value) =>
                        handleTableCellSave(rowIndex, colIndex, value)
                      }
                      readOnly={!isAdmin}
                    />
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
export default Table